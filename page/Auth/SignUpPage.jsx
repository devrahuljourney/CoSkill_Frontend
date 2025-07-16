import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../color/color';
import GoogleAuth from './GoogleAuth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signUpData } from '../../slices/userData';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
import { sendOtp } from '../../services/operations/authAPI';

export default function SignUpPage() {
  const user = useSelector((state) => state.userData);

  const { control, formState: { errors }, handleSubmit, setError } = useForm({
    defaultValues: {
    firstName: user.firstName || "",
    email: user.email || "",
    password: user.password || "",
    confirmPassword: user.confirmPassword || ""
  }
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
  
    try {
      dispatch(showLoader());
  
      // Save form data to redux
      dispatch(signUpData(data));
  
      // Send OTP
      const result = await sendOtp(data.email); 
  
      if (result?.success) {
        navigation.navigate("OTP");
      } else {
        Alert.alert("Failed", "OTP could not be sent");
      }
  
    } catch (err) {
      console.log("Submit Error:", err);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      dispatch(hideLoader());
    }
  };
  

  return (
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Join us today. It takes only a few steps</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputDiv}>
          {/* Username Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  placeholder="Name"
                  style={styles.input}
                />
              )}
            />
            {errors.firstName && <Text style={styles.error}>This field is required.</Text>}
          </View>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              
              rules={{
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format"
    }
  }}
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
            {errors.email && <Text style={styles.error}>{errors.email.message}.</Text>}
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}> Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
    required: "This field is required.",
    validate: (value, formValues) => 
      value === formValues.password || "Passwords do not match"
  }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.passwordWrapper}>
                  <TextInput
                    onChangeText={onChange}
                    value={value}
                    placeholder="Confirm Password"
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
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
          </View>
        </View>
      </View>

      
      <View style={styles.btn}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <GoogleAuth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Colors.background,
    marginVertical: 50,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop:5
  },
  form: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  inputDiv: {
    padding: 20,
    gap: 20,
    width: '100%',
  },
inputGroup: {
  width: '100%',
  gap: 10,
}
,
  label: {
    fontSize: 17,
    fontWeight: '500',
  },
  input: {
    width: '95%',
    backgroundColor: Colors.aquaMist,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:60
  },
  loginBtn: {
    backgroundColor: Colors.primary || '#000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },

});
