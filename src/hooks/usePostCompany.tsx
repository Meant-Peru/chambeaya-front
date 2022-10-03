import { DetailPost } from '../interfaces/DetailPost';
import { DetailPostulant } from '../interfaces/DetailPostulant';
import { PostJob } from '../types/post_job';
import { GetPostCompany } from '../util/company.service';
import { getDetallePost, getDetailPostPostulant, createPostJobContracts, getDetallePostCompany } from '../util/job.service';

export const usePostCompany = () => {
	const getPosts = async () => {
		const { listPostJob } = await GetPostCompany();
		return listPostJob as PostJob[];
	};

	const startDetailPost = async (id: string) => {
		const resp = await getDetallePost({ id });
		return resp as DetailPost;
		// return listPostJob as PostJob[];
	};

	const startDetailPostCompany = async (idPostJob: string) => {
		const resp = await getDetallePostCompany({ idPostJob });
		return resp as DetailPost;
		// return listPostJob as PostJob[];
	};

	const startDetailPostulant = async ({ idP, idJob }) => {
		const resp = await getDetailPostPostulant({ idPostJob: idJob, idPostulant: idP });
		return resp[0] as DetailPostulant;
	};

	const startCreatePostJobContracts = async (data: any) => {
		const resp = await createPostJobContracts(data);
		return resp.status;
	};

	return {
		getPosts,
		startDetailPost,
		startDetailPostCompany,
		startDetailPostulant,
		startCreatePostJobContracts,
	};
};
