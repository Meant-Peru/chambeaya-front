import { URI } from './../enviroment/enviroment';
import axios from 'axios';
import Auth from '../interfaces/Auth';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const auth = async (payload: Auth) => {
	return await axios.post(`${URI}/user/signIn`, payload);
};

export const register = async (payload: any) => {
	console.log({ payload });
	return await axios.post(`${URI}/user/signUp`, payload);
};

export const getToken = getLocalStorage(SESSION);

export const headers = {
	token: `${getToken}`,
};
