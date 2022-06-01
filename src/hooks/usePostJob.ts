import React from "react";
import { PostJob } from "../types/post_job";
import { getAllJobs, getJob } from "../util/job.service";

export const usePostJob = (id?: string) => {
  const [postJobs, setPostJobs] = React.useState<PostJob[]>([]);
  const [postJob, setPostJob] = React.useState<PostJob>({});

  const getAllJobsData = async () => {
    const {
      data: { listPostJob },
    } = await getAllJobs();
    setPostJobs(listPostJob);
  };

  const getJobData = async (id: string) => {
    const {
      data: { job },
    } = await getJob(id);
    setPostJob(job);
  }

  React.useEffect(() => {
    getAllJobsData();
    getJobData(id!);
  }, []);


  return { postJobs, postJob }
};
