import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../color/color';
import GoogleAuth from './GoogleAuth';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function LoginPage() {
  const { control, formState: { errors }, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigation();
  const d = useSelector((state) => state.userData)
  const onSubmit = (data) => {
    console.log(data, firstName);
    // navigate.navigate("SignUp")
  };

  return (
     <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Hi! Welcome back, you've been missed</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputDiv}>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              )}
            />
            {errors.email && <Text style={styles.error}>This field is required.</Text>}
          </View>

          {/* Password Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.passwordWrapper}>
                  <TextInput
                    onChangeText={onChange}
                    value={value}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    style={[styles.input, { flex: 1, borderWidth: 0 }]}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                  <Icon name={showPassword ? 'eye' : 'eyeo'} size={20} />

                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && <Text style={styles.error}>This field is required.</Text>}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <View style={styles.btn}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <GoogleAuth login={true} />
    </View>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Colors.background,
    marginVertical:50
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  inputDiv: {
    flex: 1,
    padding: 20,
    gap: 20,
    width:'100%'

  },
  inputGroup: {
    width:'100%'
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
  },
  input: {
    width: '95%',
    backgroundColor: Colors.aquaMist,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  passwordWrapper: {
    flexDirection: 'row',
    width: '95%',
    backgroundColor: Colors.aquaMist,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingRight: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    backgroundColor: Colors.primary || '#000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width:'90%',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.grey,
    fontWeight: '500',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});
