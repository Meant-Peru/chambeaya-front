import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const getSkill = async () => {
	const token = await getLocalStorage(SESSION);
	return await axios.post(`${URI}/user/getSkill`, { headers: { token } });
};

export const createSkill = async (data: any) => {
	try {
		return await axios({
			method: 'post',
			url: `${URI}/user/createSkill`,
			data: { nameSkill: data.nameSkill, description: data.descriptionSkill },
		}).then((res) => res.data.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};