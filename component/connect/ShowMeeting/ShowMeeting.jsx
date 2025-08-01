import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../slices/loaderSlice';
import { getMeetingByStatus } from '../../../services/operations/personalMeetingAPI';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetingCard from './MeetingCard';

export default function ShowMeeting({ status }) {
  const [meetingData, setMeetingData] = useState([]);
  const { token } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const getMeeting = async () => {
    try {
      dispatch(showLoader());
      const res = await getMeetingByStatus(status, token);
      setMeetingData(res?.meetings || []);
      dispatch(hideLoader());
    } catch (err) {
      console.log("Error fetching meetings", err);
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    getMeeting();
  }, [status]);

  return (
    <SafeAreaView style={styles.container}    >
      {meetingData.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {meetingData.map((meeting, idx) => (
            <MeetingCard key={meeting._id || idx} meeting={meeting} status={status} onAction={getMeeting} />
          ))}
          <View style={{ height: 50 }} />
        </ScrollView>
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Meetings</Text>
        </View>
      )}

      <View style={styles.space} ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },

  space: {
    marginBottom:200
  },
});
