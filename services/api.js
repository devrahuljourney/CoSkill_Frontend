import { LOCAL_BASE_URL, PROD_BASE_URL } from '@env';
console.log(LOCAL_BASE_URL,PROD_BASE_URL);

const BASE_URL = PROD_BASE_URL
console.log("BASE URL", BASE_URL)

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/otp-generate",
  SIGNUP_API: BASE_URL + "/auth/sign-up",
  LOGIN_API: BASE_URL + "/auth/login",
  PUSH_EXPO_TOKEN : BASE_URL + "/auth/push-expo-token"
  
}

export const skillEndPoints = {
  CREATE_SKILL : BASE_URL + "/skill/create-skill",
  ASSIGN_SKILL : (userId) => BASE_URL +`/skill/assign-skill/${userId}`,
  GET_ALL_SKILL : BASE_URL + "/skill/get-all-skill",
  TRENDING_SKILL_BY_AREA : (userId) => BASE_URL +`/skill/trending-skill-by-location/${userId}`
}

export const userEndpoints = {
  GET_NEAR_USER : BASE_URL + "/user/get-near-user",
  BEST_MATCH : BASE_URL + "/user/best-match",
  SEARCH: (search) => BASE_URL +`/user/search-match?search=${search}`
}

export const connectionsEndpoints = {
  REQUEST_USER : (userId) => BASE_URL +`/connection/request-sent/${userId}`,
  ACCEPT_REQUEST : (userId) => BASE_URL +`/connection/accept-request/${userId}`,
  REMOVE_REQUEST : (userId) => BASE_URL +`/connection/remove-request/${userId}`,
  GET_ALL_REQUEST : BASE_URL +`/connection/get-all-request`,


}

export const personalMeetingEndpoints = {
  GET_AVAILABLE_USE : BASE_URL + "/personal-meeting/get-available-user",
  GET_BOOKED_SLOT : BASE_URL + "/personal-meeting/get-booked-slot",
  REQUEST_MEETING : BASE_URL + "/personal-meeting/request-meeting",
  ACCEPT_MEETING : BASE_URL + "/personal-meeting/accept-meeting",
  GET_MEETING_BY_STATUS : BASE_URL +"/personal-meeting/meeting-by-status",
  REJECT_MEETING : BASE_URL +"/personal-meeting/reject-meeting"


}