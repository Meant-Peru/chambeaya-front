import axios from 'axios';
import { URI } from '../enviroment/enviroment';
import { SESSION } from '../helpers/constants';
import { getLocalStorage } from '../helpers/localStorage';

export const GetPostCompany = async () => {
	try {
		const token = await getLocalStorage(SESSION);
		const { data } = await axios.get(`${URI}/user/getPostJob`, { headers: { token } });
		console.log("GET POST COMPANY",data.data.listPostJob.createdDate);
		// Sort by date of publication.
		data.data.listPostJob = data.data.listPostJob.sort((a, b) => {
			if (a.listPostJob.createdDate !== null && b.listPostJob.createdDate !== null && a.listPostJob.createdDate.getTime() < b.listPostJob.createdDate.getTime()) {
				return -1;
			}
			if (a.listPostJob.createdDate !== null && b.listPostJob.createdDate !== null && a.listPostJob.createdDate.getTime() > b.listPostJob.createdDate.getTime()) {
				return 1;
			}
			return 0;
		});
		return data.data;
	} catch (error) {
		console.log(error);
		return { listPostJob: [] };
	}
};

export const registerSalesCompany = async (payload: any) => {
	const token = await getLocalStorage(SESSION);
	return await axios.post(`${URI}/user/signUpByReference`, payload, { headers: { token } });
};

export const getCompanyAll = async () => {
	const token = await getLocalStorage(SESSION);
	return await axios.get(`${URI}/user/getAllUserService`, { headers: { token } });
};

export const getProjectsAllId = async () => {
	try {
		const token = await getLocalStorage(SESSION);
		const { data } = await axios.get(`${URI}/user/getPostAllJobByCompanyId`, { headers: { token } });
		return data.data;
	} catch (error) {
		console.log(error);
		return { listProjects: [] };
	}
};

export const getDetailProjectsId = async (payload: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		const { data } = await axios.post(`${URI}/user/getDetailProjectId`, payload, { headers: { token } });
		return data.data;
	} catch (error) {
		console.log(error);
		return { data: {} };
	}
};

export const uploadProjectReceipt = async (payload: any) => {
	try {
		const token = await getLocalStorage(SESSION);
		const { data } = await axios.post(`${URI}/user/uploadProjectReceipt`, payload, { headers: { token } });
		return data.status;
	} catch (error) {
		return false;
	}
};
