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
			data: { nameSkill: data.nameSkill, description: data.descriptionSkill  },
		}).then((res) => res.data.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};
export const updateSkill = async (data: any) => {
	if(data.nameSkill == null){
		data = {
			nameSkill:"",
			...data
		}
	}else if(data.descriptionskill == null) {
		data ={
			descriptionskill:"",
			...data
		}
	}
	try {
		return await axios({
			method: 'put',
			url: `${URI}/user/updateSkill`,
			data: { nameSkill: data.nameSkill, description: data.descriptionskill,
			id:data._id },
		}).then((res) => res.data.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};

export const enlazarSkill = async (data: any) => {
	try {
		console.log(data);
		return await axios({
			method: 'post',
			url: `${URI}/user/createSPCSkill`,
			data: { idSkill: data.idSkill, idCategory: data.idCategory, idPositon: data.idPosition },
		}).then((res) => res.data.data);
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};