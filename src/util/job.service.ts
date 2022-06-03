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
    return await axios({
        method: "post",
        url: `${URI}/user/getPostJobByid`,
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1NGM5ZjNmLWIyOWMtYWE2OC1hZDNjLWE1NmMwNjdiOTdjYyIsImVtYWlsIjoiY3N0aUBnbWFpbC5jb20iLCJpYXQiOjE2NTQyMjYwMzUsImV4cCI6MTY1NDMxMjQzNX0.uucRb0DXJi8cw3jokjH9gbD52iqoVf1NFYKy7bR01WI"
        },
        data: {
            id: id
        }
    }).then(res => res.data.data);
}