import React from "react";
import { PostJob } from "../types/post_job";
import { getAllJobs, getJob } from "../util/job.service";

type PostState = {
  loading?: boolean;
  postJobs?: PostJob[];
  postJob?: PostJob[];
}

export const usePostJob = (id?: string) => {
  const [postJobsState, setPostJobs] = React.useState<PostState>({
    loading: true,
    postJobs: [],
  });
  const [postJobSate, setPostJob] = React.useState<PostState>({
    loading: true,
    postJob: []
  });

  const getAllJobsData = async () => {
    const {
      data: { listPostJob },
    } = await getAllJobs();
    setPostJobs({
      loading: false,
      postJobs: listPostJob
    });
  };

  const getJobData = async (id: string) => {
    const { listPostJob } = await getJob(id);
    setPostJob({
      loading: false,
      postJob: listPostJob
    })
  }

  React.useEffect(() => {
    getAllJobsData().then(r => r);
    getJobData(id!).then(r => r);
  }, []);


  return { postJobsState, postJobSate }
};
