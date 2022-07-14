import { DetailPost } from '../interfaces/DetailPost';
import { DetailPostulant } from '../interfaces/DetailPostulant';
import { PostJob } from '../types/post_job';
import { GetPostCompany } from '../util/company.service';
import { getDetallePostCompany, getDetailPostPostulant } from '../util/job.service';

export const usePostCompany = () => {
	const getPosts = async () => {
		const { listPostJob } = await GetPostCompany();
		return listPostJob as PostJob[];
	};

	const startDetailPost = async (id: string) => {
		const resp = await getDetallePostCompany({ id });
		return resp as DetailPost;
		// return listPostJob as PostJob[];
	};

	const startDetailPostulant = async ({ idP, idJob }) => {
		const resp = await getDetailPostPostulant({ idPostJob: idJob, idPostulant: idP });
		return resp[0] as DetailPostulant;
	};

	return {
		getPosts,
		startDetailPost,
		startDetailPostulant,
	};
};
