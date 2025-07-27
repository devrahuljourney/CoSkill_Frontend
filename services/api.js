const BASE_URL = "http://192.168.2.24:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/otp-generate",
  SIGNUP_API: BASE_URL + "/auth/sign-up",
  LOGIN_API: BASE_URL + "/auth/login",
  
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
  GET_ALL_REQUEST : BASE_URL +`/connection/get-all-request`


}