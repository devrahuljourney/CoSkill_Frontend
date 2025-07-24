import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
import { getNearByUser } from '../../services/operations/userAPI';
import UserProfileCard from '../common/UserProfileCard';

export default function NearByPeople() {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData);

  const getUser = async () => {
    try {
      dispatch(showLoader());
      const result = await getNearByUser(token);
      console.log('RESULT : NEAR BY USER ', result?.users);
      setUser(result?.users);
    } catch (error) {
      console.log('ERROR : NEAR BY USER', error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="slideInLeft" delay={100} style={styles.headingContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/find-user-male.png' }} // you can replace with local icon/image
          style={styles.icon}
        />
        <Text style={styles.heading}>Nearby People</Text>
      </Animatable.View>

      <Animatable.View animation="fadeIn" delay={300}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {user?.map((data, index) => (
            <UserProfileCard key={index} user={data} />
          ))}
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingLeft: 16,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
    tintColor: '#000',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});
