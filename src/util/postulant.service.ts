import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const getPostulations = async () => {
	try {
		const token = await getLocalStorage(SESSION);
		const { data } = await axios.post(`${URI}/user/getPostulantJobfromPost`, {}, { headers: { token } });
		return data.data;
	} catch (error) {
		console.log({ error });
		return { listPostJob: [] };
	}
};
