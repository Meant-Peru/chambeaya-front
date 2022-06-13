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
		// headers: {
		// 	token:
		// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzMjgzYjI5LWE4ZWEtOTg0ZS1jOWU0LTE4ZWFmZTRjMzY3OSIsImVtYWlsIjoicGN1c2lyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzMDQ1NywiZXhwIjoxNjU0MzE2ODU3fQ.7kl8ty8VvyF4-V-SZeE53kRVO7IzQ-tjT9EwW8XYWo8',
		// },
		data: {
			id: id,
		},
	}).then((res) => res.data.data);
};

export const postulateJob = async (request: PostJobPostulantRequest) => {
	return await axios({
		method: 'post',
		url: `${URI}/user/createPostAndPostulantJob`,
		// headers: {
		// 	token:
		// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzMjgzYjI5LWE4ZWEtOTg0ZS1jOWU0LTE4ZWFmZTRjMzY3OSIsImVtYWlsIjoicGN1c2lyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDIzMDQ1NywiZXhwIjoxNjU0MzE2ODU3fQ.7kl8ty8VvyF4-V-SZeE53kRVO7IzQ-tjT9EwW8XYWo8',
		// },
		data: {
			...request,
		},
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
