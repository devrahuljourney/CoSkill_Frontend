import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../color/color';
import ConnectionSection from './ConnectionSection';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../../slices/userData';
const image = require("../../assets/skill.jpg")
export default function ProfileCard({ user, connectionStatus, onConnect, onSchedule, onEdit, connections, requested }) {
  const fullName = `${user.firstName} ${user.lastName || ''}`.trim();

  const profilePic =
    user?.profilePic?.trim() && !user.profilePic.includes('multiavatar')
      ? encodeURI(user.profilePic.trim().replace(/\s/g, ''))
      : `https://api.dicebear.com/7.x/avataaars/png?seed=${(user?.firstName || 'user').replace(/\s/g, '')}`;

      const {token} = useSelector((state) => state.userData);
      const dispatch = useDispatch();

      const clearStorage = async () => {
        try {
          await AsyncStorage.clear();
          dispatch(setToken(null))
          console.log('✅ Storage cleared');
        } catch (e) {
          console.log('❌ Failed to clear storage', e);
        }
      };

      const renderActionButton = () => {
        switch (connectionStatus) {
          case 'edit':
            return (
              <View style={styles.btn}>
                <View style={{ flex: 1 }}>
                  <Button label="Edit Profile" onPress={onEdit} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Button label="Log Out" onPress={clearStorage} color={Colors.error} />
                </View>
              </View>
            );
          case 'connect':
            return <Button label={` ${requested ? "Connect" : "Remove Request"} `} onPress={() => onConnect(user?._id)} color={Colors.primary} />;
          case 'requested':
            return <Button label="Requested" disabled color={Colors.grey} />;
          case 'schedule':
            return <Button label="Schedule" onPress={onSchedule} color={Colors.warning} />;
          default:
            return null;
        }
      };
      

  return (
    <View style={styles.card}>
      <Image
        source={image}
        style={styles.cover}
      />

      <View style={styles.profileSection}>
        <Image
          source={{ uri: profilePic || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.bio}>{user.bio || 'No bio added.'}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>{renderActionButton()}</View>
      {connections?.length > 0 && (
  <View >
    <ConnectionSection connections={connections} showOnlyOnClick={true} />
  </View>
)}

    </View>
  );
}

const Button = ({ label, onPress, disabled, color }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    paddingBottom:20
  },
  cover: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.lightGrey,
  },
  profileSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
    backgroundColor: Colors.silver,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  email: {
    fontSize: 14,
    color: Colors.grey,
    marginVertical: 2,
  },
  bio: {
    fontSize: 14,
    color: Colors.darkblack,
    marginTop: 4,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  disabled: {
    backgroundColor: Colors.silver,
  },

btn: {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12, 
},

});
