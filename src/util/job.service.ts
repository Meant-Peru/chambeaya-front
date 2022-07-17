import { URI } from './../enviroment/enviroment';
import axios from 'axios';
import Job from '../interfaces/Post';
import { PostJobPostulantRequest } from '../types/post_job_postulant_request';
import { getLocalStorage } from '../helpers/localStorage';
import { SESSION } from '../helpers/constants';
import { PostJob } from '../interfaces/PostJob';

export const addJob = async (payload: Job) => {
	return await axios.post(`${URI}/user/createPostJob`, payload);
};

export const getAllJobs = async () => {
	return await axios.get(`${URI}/user/getPostAllJob`).then((res) => res.data);
};

export const getJob = async (id: string) => {
	return await axios({
		method: 'post',
		url: `${URI}/user/getPostJobByid`,
		data: { id: id },
	}).then((res) => res.data.data);
};

export const postulateJob = async (request: PostJobPostulantRequest) => {
	const token = await getLocalStorage(SESSION);
	return await axios({
		method: 'post',
		url: `${URI}/user/createPostAndPostulantJob`,
		headers: { token: token },
		data: { ...request },
	}).then((res) => res.data.data);
};

export const postJobCompany = async (data: PostJob) => {
	try {
		const token = await getLocalStorage(SESSION);
		const resultData = await axios.post(`${URI}/user/createPostJob`, data, { headers: { token } });
		// console.log('resultData.data', resultData.data);
		return resultData;
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: false,
		};
	}
};

export const getDetallePostCompany = async (payload: any) => {
	const token = await getLocalStorage(SESSION);
	const { data } = await axios.post(`${URI}/user/getPostJobAndPostulantByid`, payload, { headers: { token } });
	return data.data;
};

export const getDetailPostPostulant = async (payload: any) => {
	const token = await getLocalStorage(SESSION);
	const { data } = await axios.post(`${URI}/user/getPostulantJobfromPostById`, payload, { headers: { token } });
	return data.data.data;
};

export const createPostJobContracts = async (payload: any) => {
	const token = await getLocalStorage(SESSION);
	const { data } = await axios.post(`${URI}/user/createPostJobContracts`, payload, { headers: { token } });
	return data;
};
