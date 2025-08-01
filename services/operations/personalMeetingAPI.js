import axios from "axios";
import { personalMeetingEndpoints } from "../api";
const {GET_AVAILABLE_USE, GET_BOOKED_SLOT, REQUEST_MEETING, ACCEPT_MEETING} = personalMeetingEndpoints

export async function getAvailableUser(token) {
    try {
        const response = await fetch(GET_AVAILABLE_USE, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 Authorization: token
            }
        });

        const result = await response.json();
        console.log("GET AVAIALABLE USER RESPONSE....", result);
        return result;

    } catch (error) {
        console.error("GET ALL AVAILABLE USER ERROR....", error);
        return null;
    }
}


export async function getBookedSlot(selected, userId, token) {
    try {
      const response = await axios.post(
        GET_BOOKED_SLOT,
        {selected,userId},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log("BOOKED SLOT RESPONSE:", response.data);
      if (response.data?.message) alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error("BOOKED SLOT ERROR:", error);
      if (error?.response) {
        console.log("BOOKED SLOT ERROR MESSAGE:", error.response);
        alert(error.response.data.message);
      }
      return null;
    }
  }

  export async function requestMeeting(hostUser, sender,date,time, senderMessage, token) {
    try {
      const response = await axios.post(
        REQUEST_MEETING,
        {hostUser,sender,date,time,senderMessage},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log("REQUEST MEETING RESPONSE:", response.data);
      if (response.data?.message) alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error("REQUEST MEETING ERROR:", error);
      if (error.response) {
        console.log("REQUEST MEETING ERROR MESSAGE:", error.response);
        alert(error.response.data.message);
      }
      return null;
    }
  }

  export async function acceptMeeting(meetingId,token) {
    try {
      const response = await axios.post(
        ACCEPT_MEETING,
        {meetingId},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log("ACCEPT MEETING RESPONSE:", response.data);
      if (response.data?.message) alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error("ACCEPT MEETING ERROR:", error);
      if (error.response?.data?.message) {
        console.log("ACCEPT MEETING ERROR MESSAGE:", error.response.data.message);
        alert(error.response.data.message);
      }
      return null;
    }
  }