import * as React from "react";
import { get } from "lodash";
import "./../sass/components/_listPost.scss";
import TagComponent from "./shared/atom/tag";

import Logo1 from "./../assets/logos/1.svg";

import ButtonComponent from "./shared/atom/button";

import { usePostJob } from "../hooks/usePostJob";
import {Backdrop, CircularProgress} from "@material-ui/core";

export default function ListPost() {
  const { postJobsState: { loading, postJobs } } = usePostJob();

  return (
    <React.Fragment>
        <Backdrop
            open={loading!}
            style={{
                zIndex: 99,
            }}
        > .
            <CircularProgress color="inherit" />
        </Backdrop>
        <section className="ListPostComponent">
            <aside className="mb-5">
                <h1>Últimos Proyectos</h1>
            </aside>
            {postJobs!.map((post) => (
                <aside key={Math.random()}>
                    <article>
                        <aside className="logoBrand">
                            <img src={Logo1} alt="" />
                        </aside>
                        <div className="rContent row">
                            <aside className="title">
                                <p>{get(post, "title", "")}</p>
                                {get(post, "state", false) && (
                                    <TagComponent
                                        type="highlight"
                                        level="dark"
                                        label="Destacado"
                                    />
                                )}
                            </aside>
                            <aside className="ubication">
                                <p>Lima, Perú</p>
                            </aside>
                            <aside className="actions">
                                <ButtonComponent
                                    link={"/detail-post/" + get(post, "_id", "")}
                                    type="secondary"
                                    label="Aplicar"
                                />
                            </aside>
                        </div>
                    </article>
                </aside>
            ))}
        </section>
    </React.Fragment>
  );
}
