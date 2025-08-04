import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../color/color';

export default function ProfileCard({ user, userId }) {
    const profilePic =
    user?.profilePic?.trim() && !user.profilePic.includes('multiavatar')
      ? encodeURI(user.profilePic.trim().replace(/\s/g, ''))
      : `https://api.dicebear.com/7.x/avataaars/png?seed=${(user?.firstName || 'user').replace(/\s/g, '')}`;
  const { userData } = useSelector(state => state);
  const isOwnProfile = user?._id === userId;
  const isConnected = user?.acceptConnection?.some(conn => conn._id === userData?.user?._id);
  const hasRequested = user?.requestConnection?.includes(userData?.user?._id);

  const [showConnections, setShowConnections] = useState(false);

  const handleButton = () => {
    if (isOwnProfile) {
      // navigate to edit
    } else if (isConnected) {
      // schedule modal
    } else if (!hasRequested) {
      // send request
    }
  };

  return (
    <View style={styles.card}>
      {/* Cover */}
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: user.coverPhoto || 'https://via.placeholder.com/600x200' }}
          style={styles.coverImage}
        />
        <Image source={{ uri: profilePic }} style={styles.avatar} />
      </View>

      {/* Name & Email */}
      <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Button */}
      <TouchableOpacity onPress={handleButton} style={styles.button}>
        <Text style={styles.buttonText}>
          {isOwnProfile ? 'Edit Profile' : isConnected ? 'Schedule' : hasRequested ? 'Requested' : 'Connect'}
        </Text>
      </TouchableOpacity>

      {/* Explore Skills */}
      {user?.exploreSkills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Skills</Text>
          <View style={styles.skillContainer}>
            {user.exploreSkills.map((skill, i) => (
              <Text key={i} style={styles.skillBadge}>
                {typeof skill === 'string' ? skill : skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Offer Skills */}
      {user?.offeredSkills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offer Skills</Text>
          <View style={styles.skillContainer}>
            {user.offeredSkills.map((skill, i) => (
              <Text key={i} style={styles.skillBadge}>
                {typeof skill === 'string' ? skill : skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Toggle Connections */}
      {user?.acceptConnection?.length > 0 && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setShowConnections(!showConnections)}>
            <Text style={styles.toggle}>
              {showConnections ? 'Hide Connections' : 'Show Connections'}
            </Text>
          </TouchableOpacity>

          {showConnections && user.acceptConnection.map((conn, i) => (
            <View key={i} style={styles.connectionItem}>
              <Image source={{ uri: conn.profilePic }} style={styles.connAvatar} />
              <View>
                <Text style={styles.connName}>{conn.firstName} {conn.lastName}</Text>
                <Text style={styles.connEmail}>{conn.email}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  coverContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#ccc',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    position: 'absolute',
    bottom: -40,
    left: 16,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  name: {
    marginTop: 48,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.darkblack,
  },
  email: {
    textAlign: 'center',
    color: Colors.grey,
    marginBottom: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.darkblack,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: Colors.softLavender,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 8,
    color: Colors.darkblack,
  },
  toggle: {
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 10,
  },
  connectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  connAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  connName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.darkblack,
  },
  connEmail: {
    fontSize: 13,
    color: Colors.grey,
  },
});
