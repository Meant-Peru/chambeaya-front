import { URI } from './../enviroment/enviroment';
import axios from 'axios';
import Auth from '../interfaces/Auth';
import Postulant from '../interfaces/User';
import { SESSION } from '../helpers/constants';

export const auth = async (payload: Auth) => {
	return await axios.post(`${URI}/user/signIn`, payload);
};

export const register = async (payload: Postulant) => {
	console.log({ payload });
	return await axios.post(`${URI}/user/signUp`, payload);
};

export const getToken = localStorage.getItem(SESSION);

export const headers = {
	token: `${getToken}`,
};
