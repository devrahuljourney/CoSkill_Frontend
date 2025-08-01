import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAvailableUser } from '../../services/operations/personalMeetingAPI';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
import PersonalMeetingCard from './PersonalMeetingCard';

export default function PersonalMeeting() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData);

  const fetchAvailableUsers = async () => {
    try {
      dispatch(showLoader());
      const res = await getAvailableUser(token);
      console.log(res?.users);
      setUsers(res?.users || []);
      dispatch(hideLoader());
    } catch (err) {
      console.log('Error fetching users:', err);
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchAvailableUsers();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={true}
  contentContainerStyle={{ paddingBottom: 200 }}>
        {users.length === 0 ? (
          <Text style={styles.emptyText}>
            No user found. Send connection request first.
          </Text>
        ) : (
          <View style={styles.viewPort}>
            {
              users.map((u, idx) => (
            <PersonalMeetingCard key={u._id || idx} user={u} />
          ))
            }
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },

  viewPort: {
    flex:1,
    marginBottom:20
  },


});
