import { userEndpoints } from "../api";

const {GET_NEAR_USER} = userEndpoints

export async function getNearByUser(token) {
    try {
        const response = await fetch(GET_NEAR_USER, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        });

        const result = await response.json();
        console.log("GET ALL NEAR USER RESPONSE....", result);
        return result;

    } catch (error) {
        console.error("GET ALL NEAR USER ERROR....", error);
        return null;
    }
}