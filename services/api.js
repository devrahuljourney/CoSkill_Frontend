const BASE_URL = "http://192.168.2.26:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/user/otp-generate",
  SIGNUP_API: BASE_URL + "/user/sign-up",
  LOGIN_API: BASE_URL + "/user/login",
  
}

export const skillEndPoints = {
  CREATE_SKILL : BASE_URL + "/skill/create-skill",
  ASSIGN_SKILL : (userId) => BASE_URL +`/skill/assign-skill/${userId}`,
  GET_ALL_SKILL : BASE_URL + "/skill/get-all-skill"
}