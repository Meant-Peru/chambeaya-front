import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const getPosition = async (payload: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		console.log(payload);
		const response = await axios.post(`${URI}/user/getPosition`, payload, { headers: { token } });
		console.log(response);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const createPosition = async (data: any) => {
	try {
		console.log(data);
		return await axios({
			method: 'post',
			url: `${URI}/user/createPosition`,
			data: { 
				namePosition: data.namePosition, 
				description: data.descriptionPosition,
				idCategory: data.id_category,
				idUser: 'general'
			},
		}).then((res) => res.data.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};
