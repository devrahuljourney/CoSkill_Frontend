import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../color/color';

export default function UserProfileCard({ user }) {
    const profilePic = user?.profilePic?.trim() && !user.profilePic.includes('multiavatar')
  ? encodeURI(user.profilePic.trim().replace(/\s/g, ''))
  : `https://api.dicebear.com/7.x/avataaars/png?seed=${(user?.firstName || 'user').replace(/\s/g, '')}`;




  

  const bio = user?.bio || 'No bio available.';
  const name = user?.firstName || 'Unknown';
  const navigation = useNavigation();
  const handleProfilePress = () => {
    navigation.navigate('UserProfile', { userId: user._id });
  };
  return (
    <View style={styles.card}>
      <Image
  source={{ uri: profilePic }}
  style={styles.image}
  onError={(e) => {
    console.log('Image Load Failed:', e.nativeEvent);
  }}
/>


      <Text style={styles.name}>{name}</Text>
      <Text style={styles.bio}>{bio}</Text>

      <TouchableOpacity onPress={handleProfilePress
      } style={styles.button}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: Colors.aquaMist,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    marginBottom: 12,
    borderColor: Colors.paleMint,
    borderWidth: 2
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkblack,
    marginBottom: 4,
    textAlign: 'center',
  },
  bio: {
    fontSize: 13,
    color: Colors.grey,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 6,
    
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: Colors.primary,
    borderWidth:2
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '500',
  },
});
