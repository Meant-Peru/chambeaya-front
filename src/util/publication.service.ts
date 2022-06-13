import { URI } from '../enviroment/enviroment';
import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';
import { SESSION } from '../helpers/constants';

export const getCategory = async () => {
	try {
		const token = await getLocalStorage(SESSION);
		const response = await axios.post(`${URI}/user/getCategory`, { headers: { token } });
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getPosition = async (payload: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		const response = await axios.post(`${URI}/user/getPosition`, payload, { headers: { token } });
		return response.data;
	} catch (error) {
		return error;
	}
};

export const createPosition = async (payload: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		const response = await axios.post(`${URI}/user/createPosition`, payload, { headers: { token } });
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getSkill = async (payload: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		const response = await axios.post(`${URI}/user/getSPCSkill`, payload, { headers: { token } });
		return response.data;
	} catch (error) {
		return error;
	}
};
