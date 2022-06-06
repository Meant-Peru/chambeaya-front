import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { headers } from './auth.service';

export const getSalesCompanies = async () => {
	return await axios.get(`${URI}/user/getUsersByReferences`, { headers });
};
