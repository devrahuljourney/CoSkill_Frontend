import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../color/color';
import { useNavigation } from '@react-navigation/native';

export default function GoogleAuth({login}) {

  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.lineDiv}>
        <View style={styles.line}></View>
        <Text style={styles.lineText}>Or</Text>
        <View style={styles.line}></View>
      </View>

      <TouchableOpacity style={styles.googleBtn}>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.bottomText}>
      <Text style={styles.accountText}>
          {!login ? "Already Registered !" : "Don't have an account?"}
      </Text>

        <TouchableOpacity onPress={() => !login ? navigate.navigate("Login") : navigate.navigate("SignUp")} >
          <Text style={styles.createText}> {!login ? "Login Now" : "Create Now"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  lineDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: Colors.grey,
    width:'40%'
  },
  lineText: {
    marginHorizontal: 10,
    color: Colors.grey,
    fontWeight: '600',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  googleText: {
    color: '#000',
    fontWeight: '500',
  },
  bottomText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    color: '#555',
  },
  createText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
