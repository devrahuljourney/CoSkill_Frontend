import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../color/color';

export default function ViewMatch() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/5234-removebg-preview.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.glassCard}>
        <Text style={styles.heading}>Connect & Grow with the Right Skills</Text>
        <Text style={styles.subheading}>
          Discover, share & collaborate with learners like you.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore Matches</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    overflow: 'hidden',
    padding: 10,
    position: 'relative',
    justifyContent: 'center',
    
  },
  backgroundImage: {
    position: 'absolute',
    width: '120%',
    height: 240,
    resizeMode: 'contain',
    top: 50,
    left: -30,
    opacity: 0.3,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 20,
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
    borderWidth: 0.8,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  heading: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  subheading: {
    color: Colors.white,
    fontSize: 15,
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 22,
  },
button: {
  backgroundColor: Colors.white,
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 30,
  shadowColor: Colors.white,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  elevation: 5,
},

  buttonText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
    textAlign:'center'
  },
});
