import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const getSalesCompanies = async () => {
	const token = await getLocalStorage(SESSION);
	return await axios.get(`${URI}/user/getUsersByReferences`, { headers: { token } });
};
