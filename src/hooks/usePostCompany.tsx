import { PostJob } from '../types/post_job';
import { GetPostCompany } from '../util/company.service';

export const usePostCompany = () => {
	const getPosts = async () => {
		const { listPostJob } = await GetPostCompany();
		return listPostJob as PostJob[];
	};
	return {
		getPosts,
	};
};
