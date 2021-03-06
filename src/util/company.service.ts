import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const GetPostCompany = async () => {
	try {
		const token = await getLocalStorage(SESSION);
		const { data } = await axios.get(`${URI}/user/getPostJob`, { headers: { token } });
		return data.data;
	} catch (error) {
		console.log(error);
		return { listPostJob: [] };
	}
};

export const registerSalesCompany = async (payload: any) => {
	const token = await getLocalStorage(SESSION);
	return await axios.post(`${URI}/user/signUpByReference`, payload, { headers: { token } });
};

export const getCompanyAll = async () => {
	const token = await getLocalStorage(SESSION);
	return await axios.get(`${URI}/user/getAllUserService`, { headers: { token } });
};