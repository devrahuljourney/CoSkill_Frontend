import { endpoints } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { apiConnector } from "../apiConnector";

const { SIGNUP_API, SENDOTP_API, LOGIN_API } = endpoints;

export async function Login(data) {
  try {
    const response = await apiConnector("POST", LOGIN_API, data);
    console.log("LOGIN API RESPONSE............", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    await AsyncStorage.setItem("user", JSON.stringify(response?.data?.user));
    await AsyncStorage.setItem("token", response?.data?.token);

    Alert.alert("Login Successful");

    return response?.data;
  } catch (error) {
    console.log("LOGIN API ERROR............", error);
    if (error.response) console.log("Response error", error?.response?.data);
    Alert.alert(
      "Login Failed",
      error.response?.data?.message || error.message || "Something went wrong."
    );
  }
}


// REGULAR ASYNC FUNCTION: SIGNUP
export async function signUp(data, navigate) {
  try {
    const response = await apiConnector("POST", SIGNUP_API, data);

    console.log("SIGNUP API RESPONSE............", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    await AsyncStorage.setItem("user", JSON.stringify(response?.data?.user));
    await AsyncStorage.setItem("token", response?.data?.token);

    Alert.alert("Signup Successful", "Please log in to continue.");
    // navigate.navigate("Login");

    return response?.data;
  } catch (error) {
    console.log("SIGNUP API ERROR............", error);
    if(error.response) console.log(error.response.data)
        Alert.alert(
            "Signup Failed",
            error.response?.data || error.message || "Something went wrong."
          );
          
  }
}

export async function sendOtp(email) {
  try {
    const response = await apiConnector("POST", SENDOTP_API, { email });

    console.log("SEND OTP RESPONSE............", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    Alert.alert("OTP Sent", "Check your email.");
    return {success: true}
  } catch (error) {
    console.log("SEND OTP ERROR............", error);
    // if (error.response) {
    //   // Server responded with a status other than 200 range
    //   console.log("Response data:", error.response.data);
      
    // } else if (error.request) {
    //   // Request was made but no response received
    //   console.log("Request made, no response:", error.request);
    // } else {
    //   // Something happened in setting up the request
    //   console.log("Axios config error:", error.message);
    // }
    
    Alert.alert("Failed to Send OTP", error.message || "Something went wrong.");
  }
}
