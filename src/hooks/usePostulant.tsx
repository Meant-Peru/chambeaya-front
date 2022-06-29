import React, { useEffect, useState } from 'react';
import { PostJob } from '../types/post_job';
import { getPostulations } from '../util/postulant.service';

export const usePostulant = () => {
	const startListPostulations = async () => {
		const { data } = await getPostulations();
		return data as PostJob[];
	};

	return {
		startListPostulations,
	};

	return {};
};
