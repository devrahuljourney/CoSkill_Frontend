import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../color/color';

const PersonalMeetingCard = ({ user }) => {
  const navigation = useNavigation();



  const profilePic =
    user?.profilePic?.trim() && !user.profilePic.includes('multiavatar')
      ? encodeURI(user.profilePic.trim().replace(/\s/g, ''))
      : `https://api.dicebear.com/7.x/avataaars/png?seed=${(user?.firstName || 'user').replace(/\s/g, '')}`;

  const handleScheduleMeeting = () => {
    if (user?._id) {
      navigation.navigate('CalendarScreen', { userId: user._id });
    }
  };

  const handleViewProfile = () => {
    if (user?._id) {
      navigation.navigate('Profile', { userId: user._id });
    }
  };


  



  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.row} onPress={handleViewProfile}>
        <Image
          source={{ uri: profilePic || 'https://via.placeholder.com/60' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{user?.firstName?.trim() || 'No Name'}</Text>
          <Text style={styles.location}>
            {[user?.city, user?.state].filter(Boolean).join(', ') || 'Unknown'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Can Help With</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.skillRow}>
            {Array.isArray(user?.offeredSkills) && user.offeredSkills.length ? (
              user.offeredSkills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill?.name || 'Unnamed'}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noSkill}>No skills added</Text>
            )}
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Want to learn</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.skillRow}>
            {Array.isArray(user?.exploreSkills) && user.exploreSkills.length ? (
              user.exploreSkills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill?.name || 'Unnamed'}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noSkill}>No skills added</Text>
            )}
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleScheduleMeeting}>
        <Text style={styles.btnText}>Schedule Meeting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
    backgroundColor: Colors.silver,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 17,
    color: Colors.black,
  },
  location: {
    fontSize: 13,
    color: Colors.grey,
    marginTop: 2,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 6,
    color: Colors.black,
  },
  skillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  skillTag: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  skillText: {
    fontSize: 13,
    color: Colors.black,
  },
  noSkill: {
    fontSize: 12,
    color: Colors.grey,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  btnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PersonalMeetingCard;
