import * as React from "react";
import "./../sass/components/_listPost.scss";

import { usePostJob } from "../hooks/usePostJob";
import { Backdrop, CircularProgress } from "@material-ui/core";
import {Pagination} from './Pagination';

export default function ListPost() {
  const {postJobsState: { loading, postJobs },} = usePostJob();

  const [loadingPost, setLoadingPost] = React.useState(false);

  React.useEffect(() => {
	if (postJobs.length > 0) {
		console.log('$$$$$$$$$$$$$$$$$$$$$$postJobs', postJobs);
		setLoadingPost(true);
	}
  }, [postJobs]);

  return (
    <React.Fragment>
      <Backdrop
        open={loading!}
        style={{
          zIndex: 99,
        }}
      >
        {" "}
        .
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="ListPostComponent">
        <aside className="mb-5">
          <h1>Últimos Proyectos</h1>
          <br /><br /><br />
        </aside>
		{
			loadingPost ? (<Pagination postJobs={postJobs} itemsPerPage={4} key={1} />) : (<></>)
		}
	
      </section>
    </React.Fragment>
  );
}
