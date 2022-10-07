import { URI } from './../enviroment/enviroment';
import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';
import { SESSION } from '../helpers/constants';

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
};

export const ListUser = async () => {
	try {
		const token = await getLocalStorage(SESSION);
		const resultData = await axios.get(`${URI}/user/getAllUserService`, {
			headers: {
				token: `${token}`,
			},
		});
		return resultData.data;
	} catch (error) {
		
	}
}

export const UpdateUser = async (data: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		const resultData = await axios.post(`${URI}/user/updateUser`, data, { headers: { token } });
		return resultData.data;
	} catch (error) {
		return false;
	}
};

export const GetUserById = async (payload: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		const  data  = await axios.post(`${URI}/user/getUserById`, payload, { headers: { token }});
		return data.data;
	} catch (error) {
		console.log(error);
		return { data: {} };
	}
}
