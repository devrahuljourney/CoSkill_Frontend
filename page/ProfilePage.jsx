import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getUserDataFromStorage } from '../utils/getUserData';
import { getUser } from '../services/operations/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../slices/loaderSlice';
import ProfileCard from '../component/profilepage/ProfileCard';

export default function ProfilePage() {
  const route = useRoute();
  const routeUserId = route.params?.userId || null;

  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData);

  const fetchProfile = async (id) => {
    dispatch(showLoader());
    const res = await getUser(id, token);
    if (res?.success) setData(res?.data);
    dispatch(hideLoader());
  };

  const [userId, setUserId] = useState({});

  useEffect(() => {
    const load = async () => {
      if (routeUserId) fetchProfile(routeUserId);
      else {
        const storedUser = await getUserDataFromStorage();
        if (storedUser?._id){
          fetchProfile(storedUser._id);
          setUserId(storedUser?._id)
        }
      }
    };
    load();
  }, [routeUserId]);

  if (!data) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <ProfileCard user={data} userId = {userId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FB',
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  },
});
