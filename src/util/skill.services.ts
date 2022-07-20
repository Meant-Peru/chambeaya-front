import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const getSkill = async () => {
	const token = await getLocalStorage(SESSION);
	return await axios.post(`${URI}/user/getSkill`, { headers: { token } });
};
