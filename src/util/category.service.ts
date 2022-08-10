import axios from 'axios';
import { Category } from '../interfaces/Category';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const getCategory = async () => {
	const token = await getLocalStorage(SESSION);
	return await axios.post(`${URI}/user/getCategory`, { headers: { token } });
};

export const createCategory = async (data: any) => {
	try {
		return await axios({
			method: 'post',
			url: `${URI}/user/createCategory`,
			data: { name: data.nameCategory, description: data.descriptionCategory },
		}).then((res) => res.data.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};

