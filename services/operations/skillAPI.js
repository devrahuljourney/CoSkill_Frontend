import { skillEndPoints } from "../api";

const { ASSIGN_SKILL, GET_ALL_SKILL } = skillEndPoints;

export async function assignSkill(offeredSkills, exploreSkills, token, id) {
    try {
        const response = await fetch(ASSIGN_SKILL(id), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({ offeredSkills, exploreSkills })
        });

        const result = await response.json();
        console.log("ASSIGN SKILL RESPONSE....", result);
        return result;
        
    } catch (error) {
        console.error("ASSIGN SKILL ERROR....", error);
        if(error?.response) {
            console.log("ERROR : ASSIGN ", error?.response?.error)
        }
        return null;
    }
}


export async function getAllSkill() {
    try {
        const response = await fetch(GET_ALL_SKILL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        console.log("GET ALL SKILL RESPONSE....", result);
        return result;

    } catch (error) {
        console.error("GET ALL SKILL ERROR....", error);
        return null;
    }
}
