import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { assignSkill, getAllSkill } from '../../services/operations/skillAPI';
import { useDispatch, useSelector } from 'react-redux';
import CommonTemplate from '../../component/ExploreAndOffer/CommonTemplate';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setToken, signUpData } from '../../slices/userData';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function ExploreAndOfferPage() {
  const [skill, setSkill] = useState([]);
  const [exploreSkills, setExploreSkills] = useState([]);
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [step, setStep] = useState(1);

  const { token } = useSelector((state) => state.userData);
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchAllSkill = async () => {
    try {
      const res = await getAllSkill();
      // console.log('Skill:', res?.skill);
      setSkill(res.skill || []);
    } catch (error) {
      // console.log('Error in fetching skill:', error);
    }
  };

  useEffect(() => {
    fetchAllSkill();
  }, []);

  const onSubmit = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    Alert.alert(
      "Location Access Needed",
      "We will use your city and state to show you better skill matches. Your exact location will not be stored.",
      [
        {
          text: "Continue",
          onPress: async () => {
            dispatch(showLoader());

            try {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                console.warn('Location permission denied');
                dispatch(hideLoader());
                return;
              }

              const location = await Location.getCurrentPositionAsync({});
              const { latitude, longitude } = location.coords;

              const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
              const city = place?.city || 'Unknown City';
              const state = place?.region || 'Unknown State';

              const { user } = route.params;
              const res = await assignSkill(
                offeredSkills,
                exploreSkills,
                token,
                user?._id,
                { city, state }
              );

              if (res?.success) {
                const { token: routeToken, user } = route?.params || {};
                if (routeToken && user) {
                  dispatch(setToken(routeToken));
                  dispatch(signUpData(user));
                }
                // console.log('RES : ASSIGN', res);
              } else {
                console.warn('Assign Skill Failed', res?.message);
              }

            } catch (error) {
              console.error('Error in onSubmit:', error);
            }

            dispatch(hideLoader());
          },
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <CommonTemplate
          skill={skill}
          selectedSkill={exploreSkills}
          setSelectedSkill={setExploreSkills}
          onSubmit={onSubmit}
          step={1}
          title="What skill are you interested in learning?"
          lineLength={2}
          btn="Next"
        />
      ) : (
        <CommonTemplate
          skill={skill}
          selectedSkill={offeredSkills}
          setSelectedSkill={setOfferedSkills}
          onSubmit={onSubmit}
          step={2}
          title="What skill can you offer to share?"
          lineLength={2}
          btn="Done"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
