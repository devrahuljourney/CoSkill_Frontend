import { personalMeetingEndpoints } from "../api";

const {GET_AVAILABLE_USE} = personalMeetingEndpoints

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
