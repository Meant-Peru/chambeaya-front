import { URI } from "./../enviroment/enviroment";
import axios from "axios";
import Auth from "../interfaces/Auth";

export const auth = async (payload: Auth)=>{
    return await axios.post(`${URI}/user/signIn`,payload);

}