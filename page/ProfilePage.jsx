import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserDataFromStorage } from '../utils/getUserData';
import { getUser } from '../services/operations/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../slices/loaderSlice';
import ProfileCard from '../component/profilepage/ProfileCard';
import ExploreSkillsCard from '../component/profilepage/ExploreSkillCard';
import OfferSkillsCard from '../component/profilepage/OfferSkillCard';
import ConnectionSection from '../component/profilepage/ConnectionSection';
import { removeUserRequest, requestUser } from '../services/operations/connectionAPI';

export default function ProfilePage() {
  const route = useRoute();
  const routeUserId = route.params?.userId || null;

  const [data, setData] = useState(null);
  
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState();
  const { token } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [requested, setRequested] = useState(false);

  const fetchProfile = async (id) => {
    dispatch(showLoader());
    const res = await getUser(id, token);
    if (res?.success) {
      setData(res?.data);
      setConnectionStatus(res?.connectionStatus);
    }

    console.log(res?.connectionStatus)
    dispatch(hideLoader());
  };

  const onSchedule = async() => {
    if (routeUserId) {
      navigation.navigate('CalendarScreen', { userId: routeUserId });
    }
  }



  useEffect(() => {
    const checkRequestStatus = async () => {
      const user = await getUserDataFromStorage();
      if (user?.requestSent?.includes(data._id)) {
        setRequested(true);
      }
    };
    checkRequestStatus();
  }, []);

  const onConnect = async (id) => {
    dispatch(showLoader());
    let res;
    if (!requested) {
      res = await requestUser(id, token);
    } else {
      res = await removeUserRequest(id, token);
    }

    if (res?.success) {
      setRequested(!requested);
    }

    dispatch(hideLoader());
  };

  useEffect(() => {
    const load = async () => {
      if (routeUserId) {
        setIsOwnProfile(false);
        fetchProfile(routeUserId);
      } else {
        const storedUser = await getUserDataFromStorage();
        if (storedUser?._id) {
          setIsOwnProfile(true);
          fetchProfile(storedUser._id);
        }
      }
    };
    load();
  }, [routeUserId]); 

  if (!data) return <Text style={{ padding: 16 }}>Loading...</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}   contentContainerStyle={{ paddingBottom: 200 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>
          {isOwnProfile ? 'My Profile' : `${data?.firstName}'s Profile`}
        </Text>

        <ProfileCard onConnect={onConnect} requested={requested} user={data} connectionStatus={connectionStatus} connections={data?.acceptConnection} onSchedule={onSchedule} />

      

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Skills</Text>
          {data?.exploreSkills?.length > 0 ? (
            <ExploreSkillsCard skills={data.exploreSkills} />
          ) : (
            <Text style={styles.emptyText}>No explore skills added.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offered Skills</Text>
          {data?.offeredSkills?.length > 0 ? (
            <OfferSkillsCard skills={data.offeredSkills} />
          ) : (
            <Text style={styles.emptyText}>No offered skills added.</Text>
          )}
        </View>

        

        <View style={{ marginBottom: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:10,
    
  },
  backBtn: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
  },
});