import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
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

  const { token, _id } = useSelector((state) => state.userData);
  const route = useRoute();
  const dispatch = useDispatch();

  const sto = useAsyncStorage();
  

  const fetchAllSkill = async () => {
    try {
      const res = await getAllSkill();
      console.log('Skill:', res?.skill);
      setSkill(res.skill || []);
    } catch (error) {
      console.log('Error in fetching skill:', error);
    }
  };

  const navigate = useNavigation()

  const onSubmit = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    dispatch(showLoader())

    const {user} = route.params;

    const res = await assignSkill(offeredSkills, exploreSkills, token, user?._id);
    dispatch(hideLoader())

    if (res?.success) {
      const { token: routeToken, user } = route?.params || {};
      if (routeToken && user) {
        dispatch(setToken(routeToken));
        dispatch(signUpData(user));
      }
      console.log('RES : ASSIGN', res);
    } else {
      console.warn('Assign Skill Failed', res?.message);
    }
  };

  useEffect(() => {
    fetchAllSkill();
  }, []);

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
