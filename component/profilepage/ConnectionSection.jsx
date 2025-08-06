import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../color/color'; 
import { useNavigation } from '@react-navigation/native';

export default function ConnectionSection({ connections = [], showOnlyOnClick = false }) {
  const [show, setShow] = useState(!showOnlyOnClick);

  const uniqueConnections = Array.from(
    new Map(connections.map(c => [c._id, c])).values()
  );
  
  if (!connections.length) return null;

  const navigate = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(!show)} style={styles.toggle}>
        <Text style={styles.toggleText}>{show ? 'Hide Connections' : 'Show Connections'}</Text>
      </TouchableOpacity>

      {show && (
        <View style={styles.list}>
          {uniqueConnections.map((conn) => (
            <TouchableOpacity onPress={() => navigate.navigate("UserProfile" , {userId : conn._id}) } key={conn._id} style={styles.card}>
              <Text style={styles.name}>{conn.firstName} {conn.lastName}</Text>
              <Text style={styles.email}>{conn.email}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  
toggle: {
  backgroundColor: 'transparent',
  paddingVertical: 8,
  paddingHorizontal: 0,
  marginBottom: 12,
},

toggleText: {
  fontSize: 16,
  color: Colors.primary,
  fontWeight: '600',
},

  list: {
    gap: 14,
  },
  card: {
    backgroundColor: Colors.softLavender,
    padding: 16,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.grey,
  },
});
