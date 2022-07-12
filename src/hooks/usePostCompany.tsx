import { DetailPost } from '../interfaces/DetailPost';
import { PostJob } from '../types/post_job';
import { getDetallePostCompany, GetPostCompany } from '../util/company.service';

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
	return {
		getPosts,
		startDetailPost,
	};
};
