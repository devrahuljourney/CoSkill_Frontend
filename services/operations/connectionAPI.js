import axios from "axios";
import { connectionsEndpoints } from "../api";

const { REQUEST_USER, ACCEPT_REQUEST, REMOVE_REQUEST , GET_ALL_REQUEST} = connectionsEndpoints;

export async function requestUser(userId, token) {
  try {
    const response = await axios.post(
      REQUEST_USER(userId),
      {}, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    console.log("REQUEST USER RESPONSE:", response.data);
    if (response.data?.message) alert(response.data.message);
    return response.data;
  } catch (error) {
    console.error("REQUEST USER ERROR:", error);
    if (error.response) {
      console.log("REQUEST USER ERROR MESSAGE:", error.response);
      alert(error.response.data.message);
    }
    return null;
  }
}

export async function acceptUser(userId, token) {
  try {
    const response = await axios.post(
      ACCEPT_REQUEST(userId),
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    console.log("ACCEPT USER RESPONSE:", response.data);
    if (response.data?.message) alert(response.data.message);
    return response.data;
  } catch (error) {
    console.error("ACCEPT USER ERROR:", error);
    if (error.response?.data?.message) {
      console.log("ACCEPT USER ERROR MESSAGE:", error.response.data.message);
      alert(error.response.data.message);
    }
    return null;
  }
}

export async function removeUserRequest(userId, token) {
  try {
    const response = await axios.post(REMOVE_REQUEST(userId), {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log("REMOVE REQUEST RESPONSE:", response.data);
    // if (response.data?.message) alert(response.data.message);
    return response.data;
  } catch (error) {
    console.error("REMOVE REQUEST ERROR:", error);
    if (error?.response) {
      console.log("REMOVE REQUEST ERROR MESSAGE:", error.response);
      alert(error.response.data.message);
    }
    return null;
  }
}


export async function getAllRequest(token) {
    try {
      const response = await axios.get(GET_ALL_REQUEST, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log("REMOVE REQUEST RESPONSE:", response.data);
      // if (response.data?.message) alert(response.data.message);
      return response;
    } catch (error) {
      console.error("REMOVE REQUEST ERROR:", error);
      if (error?.response) {
        console.log("REMOVE REQUEST ERROR MESSAGE:", error.response);
        alert(error.response.data.message);
      }
      return null;
    }
  }
  