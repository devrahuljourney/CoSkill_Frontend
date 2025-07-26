import { userEndpoints } from "../api";

const {GET_NEAR_USER, BEST_MATCH, SEARCH} = userEndpoints

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

export async function getBestUser(token) {
    try {
        const response = await fetch(BEST_MATCH, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        });

        const result = await response.json();
        console.log("GET BEST MATCH RESPONSE....", result);
        return result;

    } catch (error) {
        console.error("GET BEST MATCH ERROR....", error);
        return null;
    }
}

export async function getBestSearh(token, search) {
    try {
      const url = SEARCH(search);
      console.log("🔍 Fetching URL:", url, search);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      console.log("📦 Raw response object:", response);
  
      const result = await response.json();
      console.log("✅ Parsed response JSON:", result);
  
      return result?.data;
    } catch (error) {
      console.error("❌ GET BEST SEARCH ERROR:", error);
      return null;
    }
  }
  