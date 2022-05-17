import { URI } from "./../enviroment/enviroment";
import axios from "axios";
import Job from "../interfaces/Post";

export const addJob = async (payload: Job)=>{
    return await axios.post(`${URI}/user/createPostJob`,payload);

}