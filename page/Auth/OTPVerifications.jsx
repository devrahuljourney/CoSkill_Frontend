import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { OtpInput } from "react-native-otp-entry";
import { Colors } from "../../color/color";
import { useNavigation } from "@react-navigation/native";
import { otp, setToken, signUpData  } from "../../slices/userData";
import { hideLoader, showLoader } from "../../slices/loaderSlice";
import { sendOtp, signUp } from "../../services/operations/authAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTPVerifications() {
  const user = useSelector((state) => state.userData);
  const { email } = user;

  const [enteredOtp, setEnteredOtp] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const resentOtp = async() => {
    try {
        dispatch(showLoader());
    
        
    
        // Send OTP
        const result = await sendOtp(email); 
    
    
    
      } catch (err) {
        console.log("Submit Error:", err);
        Alert.alert("Error", "Something went wrong.");
      } finally {
        dispatch(hideLoader());
      }
    };
  

  const submitHandler = async () => {
    if (!enteredOtp || enteredOtp.length < 6) {
      Alert.alert("Invalid OTP", "Fill OTP before submitting!");
      return;
    }

    console.log(user)
  
    try {
      dispatch(showLoader());
  
      // Save OTP to Redux
      dispatch(otp(enteredOtp));
  
      const res = await signUp({...user, otp: enteredOtp}, navigation);  
      AsyncStorage.setItem("token", res?.token)

      console.log("Res :", res, user.otp)
      dispatch(setToken(res?.token));
      dispatch(signUpData(res?.user))
  
    } catch (error) {
      console.log("Submit Handler Error:", error);
      Alert.alert("Signup Failed", error.message || "Something went wrong.");
    } finally {
      dispatch(hideLoader());
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("SignUp")}>
        <Ionicons name="arrow-back-circle-outline" size={40} />
      </TouchableOpacity>

      <View style={styles.secondContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.heading}>Verify Code</Text>
          <Text style={styles.subtext}>
            Please enter the code we just sent to email <Text style={styles.email}>{email}</Text>
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <OtpInput
            numberOfDigits={6}
            placeholder="******"
            type="numeric"
            onFilled={(text) => setEnteredOtp(text)}
            theme={{
              filledPinCodeContainerStyle: styles.filledPinCodeContainerStyle,
              pinCodeContainerStyle: styles.pinCodeContainerStyle,
              focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
              focusStickStyle: styles.focusStickStyle,
            }}
          />

          <View style={styles.resendContainer}>
            <Text>Didn't receive OTP?</Text>
            <TouchableOpacity onPress={resentOtp} >
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={submitHandler} style={styles.verifyBtn}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
  arrow: {
    position: "absolute",
    top: 40,
    left: 25,
  },
  secondContainer: {
    flex: 1,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  email: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtext: {
    color: Colors.grey,
    fontSize: 15,
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginBottom: 50,
  },
  resendText: {
    color: Colors.primary,
  },
  verifyBtn: {
    backgroundColor: Colors.darkblack,
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  verifyText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  otpContainer: {
    gap: 20,
  },
  filledPinCodeContainerStyle: {
    backgroundColor: Colors.lightGrey,
  },
  pinCodeContainerStyle: {
    backgroundColor: Colors.aquaMist,
  },
  focusedPinCodeContainerStyle: {
    borderColor: Colors.black,
  },
  focusStickStyle: {
    backgroundColor: Colors.black,
  },
});
