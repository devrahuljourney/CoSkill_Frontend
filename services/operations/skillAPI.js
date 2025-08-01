import { skillEndPoints } from "../api";

const { ASSIGN_SKILL, GET_ALL_SKILL, TRENDING_SKILL_BY_AREA } = skillEndPoints;

export async function assignSkill(offeredSkills, exploreSkills, token, id,location) {
    try {
        const response = await fetch(ASSIGN_SKILL(id), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({ offeredSkills, exploreSkills,location })
        });

        const result = await response.json();
        // console.log("ASSIGN SKILL RESPONSE....", result);
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
        // console.log("GET ALL SKILL RESPONSE....", result);
        return result;

    } catch (error) {
        console.error("GET ALL SKILL ERROR....", error);
        return null;
    }
}


export async function trendingSkillByArea(userId,token) {
    try {
        const response = await fetch(TRENDING_SKILL_BY_AREA(userId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 Authorization: token
            }
        });

        const result = await response.json();
        // console.log("GET ALL TRENDING SKILL RESPONSE....", result);
        return result;

    } catch (error) {
        console.error("GET ALL TRENDING SKILL ERROR....", error);
        return null;
    }
}
