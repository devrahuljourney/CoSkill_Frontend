import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ConnectionCard({ user, type, onAccept, onRemove, joined }) {
  const profilePic = user?.profilePic?.trim() && !user.profilePic.includes('multiavatar')
    ? encodeURI(user.profilePic.trim().replace(/\s/g, ''))
    : `https://api.dicebear.com/7.x/avataaars/png?seed=${(user?.firstName || 'user').replace(/\s/g, '')}`;

  return (
    <View style={styles.card}>
      <Image source={{ uri: profilePic }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{user.firstName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {type === 'received' && (
  <TouchableOpacity onPress={() => onAccept(user._id)} style={styles.btnAccept}>
    <Ionicons name="checkmark" size={20} color="#000" />
  </TouchableOpacity>
)}

<TouchableOpacity onPress={() => onRemove(user._id)} style={styles.btnRemove}>
  <Ionicons name="close" size={20} color="#000" />
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: '#eee',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
  },
  email: {
    fontSize: 13,
    color: '#555',
  },
  btnAccept: {
    backgroundColor: '#B9FD50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnRemove: {
    backgroundColor: '#ff5757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  btnText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000',
  },
});
