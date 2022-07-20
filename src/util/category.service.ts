import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const GetCategory = async () => {
	const token = await getLocalStorage(SESSION);
	return await axios.post(`${URI}/user/getCategory`, { headers: { token } });
};
