import axios from 'axios';
import { URI } from '../enviroment/enviroment';

export const GetPostCompany = async (idCompany: string) => {
	try {
		const resultData = await axios.get(`${URI}/user/getPostJob`, {
			headers: {
				// token: `${token}`,
			},
		});
		return resultData.data;
	} catch (error) {
		console.log(error);
	}
};
