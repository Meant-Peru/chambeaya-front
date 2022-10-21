import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const deleteData = async (data,type) => {
	try {
		console.log(data);
		return await axios({
			method: 'delete',
			url: `${URI}/user/deleteService`,
			data: { 
                collection : type,
                id:data._id
			},
		}).then((res) => res.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};