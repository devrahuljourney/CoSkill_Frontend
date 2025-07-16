import { endpoints } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { apiConnector } from "../apiConnector";

const { SIGNUP_API, SENDOTP_API } = endpoints;



// REGULAR ASYNC FUNCTION: SIGNUP
export async function signUp(data, navigate) {
  try {
    const response = await apiConnector("POST", SIGNUP_API, data);

    console.log("SIGNUP API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    await AsyncStorage.setItem("token", response.data.token);

    Alert.alert("Signup Successful", "Please log in to continue.");
    navigate.navigate("Login");
  } catch (error) {
    console.log("SIGNUP API ERROR............", error);
    if(error.response) console.log(error.response.data)
        Alert.alert(
            "Signup Failed",
            error.response?.data?.message || error.message || "Something went wrong."
          );
          
  }
}

export async function sendOtp(email) {
  try {
    const response = await apiConnector("POST", SENDOTP_API, { email });

    console.log("SEND OTP RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    Alert.alert("OTP Sent", "Check your email.");
    return {success: true}
  } catch (error) {
    console.log("SEND OTP ERROR............", error);
    
    Alert.alert("Failed to Send OTP", error.message || "Something went wrong.");
  }
}
