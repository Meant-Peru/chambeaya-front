import { URI } from "./../enviroment/enviroment";
import axios from "axios";
import Auth from "../interfaces/Auth";
import Account from "../interfaces/Account";

export const auth = async (payload: Auth)=>{
    return await axios.post(`${URI}/user/signIn`,payload);

}

export const register = async (payload: Account)=>{
    return await axios.post(`${URI}/user/signUp`,payload);

}