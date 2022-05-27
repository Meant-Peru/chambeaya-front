import { URI } from "../enviroment/enviroment";
import axios from "axios";
import { headers } from "./auth.service";

export const getCategory = async ()=>{
    try {
        const response = await axios.post(`${URI}/user/getCategory`, { headers });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getPosition = async (payload: any) => {
    try {
        const response = await axios.post(`${URI}/user/getPosition`, payload, { headers });
        return response.data;
    } catch (error) {
        
    }
}

export const createPosition = async (payload: any) => {
    try {
        const response = await axios.post(`${URI}/user/createPosition`, payload, { headers });
        return response.data;
    } catch (error) {
        
    }
}