import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../color/color';

export default function OfferSkillsCard({ skills }) {
  return (
    <View style={styles.container}>
      {skills.map((skill) => (
        <View key={skill._id} style={styles.card}>
          <Text style={styles.name}>{skill.name}</Text>
          <Text style={styles.category}>{skill.category}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom:100
  },
  card: {
    backgroundColor: Colors.paleMint,
    padding: 12,
    borderRadius: 10,
    width: '47%',
    shadowColor: Colors.darkblack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    color: Colors.darkblack,
  },
  category: {
    fontSize: 13,
    color: Colors.grey,
  },
});
