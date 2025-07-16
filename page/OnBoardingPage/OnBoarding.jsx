import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { logo } from '../../constant/image';
import { Colors } from '../../color/color';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { useNavigation } from '@react-navigation/native';

export default function OnBoarding() {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.tagline}>Connect {'>'} Collaborate {'>'} Grow</Text>
      </View>
      
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Get Started</Text>
            <AntDesign name="arrowright" size={18} color={Colors.white} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '80%',
    height: 120,
    marginBottom: 0,
  },
  tagline: {
    fontSize: 18,
    color: Colors.grey,
    fontWeight: 'bold',
    marginTop: 0,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 100,
    borderRadius: 40,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  icon: {
    marginTop: 1,
  },
});
