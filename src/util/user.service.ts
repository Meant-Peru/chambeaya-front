import { URI } from "./../enviroment/enviroment";
import axios from "axios";
import { getToken } from "./auth.service";
import User from "../interfaces/User";

export const GetUser = async ()=>{
    try {
        console.log(getToken);
        const resultData = await axios.get(`${URI}/user/getUser`, {
          headers: {
                token : `${getToken}`
            }
            
        });
        console.log(resultData.data.data.dataUser)
        let userData : User ={
            businessName : resultData.data.data.dataUser.business_name,
            email: resultData.data.data.email,
            phone: resultData.data.data.dataUser.phone
        }


        return userData
        
    } catch (error) {
        console.log(error)
    }
    // return getUser();

}
