import axios from 'axios';
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
			data: { nameCategory: data.nameCategory, descriptionCategory: data.descriptionCategory },
		}).then((res) => res.data.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};
export const searchPostByCategory = async (c: string) => {
	try {
		return await axios({
			method: 'post',
			url: `${URI}/user/searchPostJobByCategory`,
			data: { idCategory : c },
		}).then((res) => res.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};
