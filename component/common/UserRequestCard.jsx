import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../color/color';
import { requestUser, removeUserRequest } from '../../services/operations/connectionAPI';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
import { getUserDataFromStorage } from '../../utils/getUserData';

export default function UserRequestCard({ data }) {
  const profilePic = data?.profilePic?.trim() && !data.profilePic.includes('multiavatar')
    ? encodeURI(data.profilePic.trim().replace(/\s/g, ''))
    : `https://api.dicebear.com/7.x/avataaars/png?seed=${(data?.firstName || 'user').replace(/\s/g, '')}`;

  const { token } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const checkRequestStatus = async () => {
      const user = await getUserDataFromStorage();
      if (user?.requestSent?.includes(data._id)) {
        setRequested(true);
      }
    };
    checkRequestStatus();
  }, []);

  const onPressRequest = async (id) => {
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

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: profilePic }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{data.firstName.trim()}</Text>
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{data.matchPercentage}%</Text>
          </View>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.skillSection}>
        <Text style={styles.sectionTitle}>They can teach you:</Text>
        <View style={styles.skillWrap}>
          {data.matchedToMe.map((skill, i) => (
            <View key={i} style={styles.teachBadge}>
              <Text style={styles.badgeText}>{skill}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>You can teach them:</Text>
        <View style={styles.skillWrap}>
          {data.matchedFromMe.map((skill, i) => (
            <View key={i} style={styles.learnBadge}>
              <Text style={styles.badgeText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Request/Remove Button */}
      <TouchableOpacity
        onPress={() => onPressRequest(data._id)}
        style={styles.requestBtn}
      >
        <Text style={styles.requestText}>
          {requested ? "❌ Cancel Request" : "🤝 Send Request"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#eee',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#eee',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkblack,
  },
  matchBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#E0F7E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  matchText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#222',
  },
  skillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  teachBadge: {
    backgroundColor: '#D4F5E6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  learnBadge: {
    backgroundColor: '#D8EAFE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    color: '#333',
  },
  requestBtn: {
    marginTop: 16,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  requestText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
