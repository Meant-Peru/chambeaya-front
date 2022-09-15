import React from 'react';
import { PostJob } from '../types/post_job';
import { getAllJobs, getJob } from '../util/job.service';
import { PostJobPostulantRequest } from '../types/post_job_postulant_request';

type PostState = {
	loading?: boolean;
	postJobs?: PostJob[];
	postJob?: PostJob[];
};

export const usePostJob = (id?: string) => {
	const [postJobsState, setPostJobs] = React.useState<PostState>({
		loading: true,
		postJobs: [],
	});
	const [postJobSate, setPostJob] = React.useState<PostState>({
		loading: true,
		postJob: [],
	});

	const getAllJobsData = async () => {
		const {
			data: { listPostJob },
		} = await getAllJobs();
		console.log({ listPostJob });
		setPostJobs({
			loading: false,
			postJobs: listPostJob !== undefined ? [...listPostJob] : [],
		});
	};

	const getJobData = async (id: string) => {
		const { listPostJob } = await getJob(id);
		// const { dataSkill } = await getJob(listPostJob.);
		setPostJob({
			loading: false,
			postJob: listPostJob,
		});
	};

	React.useEffect(() => {
		getAllJobsData().then((r) => r);
		getJobData(id!).then((r) => r);
	}, []);

	return { postJobsState, postJobSate };
};

export const usePostForm = () => {
	const [form, setForm] = React.useState<PostJobPostulantRequest>({
		idPostJob: '',
		documentType: '',
		documentNumber: '',
		typeAmount: '',
		amountEstimated: '',
		skillsIds: [],
		typeBio: '',
		linkBio: '',
	});

	const handleForm = (event: any) => {+
		console.log(event);
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const reset = () => {
		setForm({
			idPostJob: '',
			documentType: '',
			documentNumber: '',
			typeAmount: '',
			amountEstimated: '',
			skillsIds: [],
			typeBio: '',
			linkBio: '',
		});
	};

	return { form, handleForm, reset };
};
