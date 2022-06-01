import { URI } from './../enviroment/enviroment';
import axios from 'axios';
import { getToken } from './auth.service';

export const GetUser = async (token: string) => {
	try {
		const resultData = await axios.get(`${URI}/user/getUser`, {
			headers: {
				token: `${token}`,
			},
		});
		return resultData.data;
	} catch (error) {
		console.log(error);
	}
	// return getUser();
};
