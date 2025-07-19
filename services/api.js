const BASE_URL = "http://192.168.2.21:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/user/otp-generate",
  SIGNUP_API: BASE_URL + "/user/sign-up",
  LOGIN_API: BASE_URL + "/user/login",
  
}