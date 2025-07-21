import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../color/color';
import { trendingSkillByArea } from '../../services/operations/skillAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../slices/loaderSlice';

export default function TrendingSkill() {
  const [skills, setSkills] = useState([]);
  const dispatch = useDispatch();
  const translateX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    fetchTrendingSkills();
  }, []);

  useEffect(() => {
    if (skills.length > 0) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [skills]);

  const fetchTrendingSkills = async () => {
    try {
      dispatch(showLoader());
      const userData = await AsyncStorage.getItem('user');
      if (!userData) throw new Error('User data not found');
      const user = JSON.parse(userData);
      const res = await trendingSkillByArea(user._id);
      setSkills(Array.isArray(res?.skills) ? res.skills : []);
    } catch (err) {
      console.error('Error fetching trending skills:', err.message);
      setSkills([]);
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleSkillTap = (skill) => {
    console.log('Skill tapped:', skill);
    // Optional: navigate, show modal, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔥 Trending Skills Near You</Text>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ transform: [{ translateX }] }}
      >
        {skills.map((skill) => (
          <TouchableOpacity
            key={skill.skillId}
            onPress={() => handleSkillTap(skill)}
            style={styles.skillCard}
            activeOpacity={0.8}
          >
            <Text style={styles.rank}>#{skill.rank}</Text>
            <Text style={styles.name}>{skill.name}</Text>
            <Text style={styles.count}>{skill.count} users</Text>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 12,
  },
  scrollContent: {
    paddingLeft: 5,
    paddingRight: 10,
  },
  skillCard: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
    
  },
  rank: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 5,
    textAlign: 'center',
  },
  count: {
    fontSize: 12,
    color: Colors.grey,
    marginTop: 3,
  },
});
