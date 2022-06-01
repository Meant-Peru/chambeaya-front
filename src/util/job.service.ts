import { URI } from "./../enviroment/enviroment";
import axios from "axios";
import Job from "../interfaces/Post";

export const addJob = async (payload: Job)=>{
    return await axios.post(`${URI}/user/createPostJob`,payload);
}

export const getAllJobs = async () => {
    return await axios.get(`${URI}/user/getPostAllJob`).then(res => res.data);
}

export const getJob = async (id: string) => {
    return await axios.get(`${URI}/user/getPostJob`, {
        params: {
            id: id
        }
    }).then(res => res.data);
}