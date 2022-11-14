import { Fragment, useEffect, useState } from "react";
import { usePostCompany } from "../hooks/usePostCompany";
import { PostJob } from "../types/post_job";
import ButtonComponent from "./shared/atom/button";
import { OptionComponent } from "./shared/atom/option";
import "./../sass/pages/_postJob.scss";

export const PostCompany = () => {
  const { getPosts } = usePostCompany();
  const [loading, setLoading] = useState(false);
  const [listPost, setListPost] = useState<PostJob[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const data = await getPosts();
    console.log(data);
    setListPost([...data]);
    setLoading(false);
  };
  if (loading) {
    return (
      <>
        <p>Cargando publicaciones....</p>
      </>
    );
  }

  return (
    <Fragment>
      <section className="usersTable">
        <article className="titleTable">
          <h2>Publicaciones</h2>
          <ButtonComponent family="terceary" link="/addJob" label="Nuevo" />
        </article>
        {listPost.length == 0 ? (
          <>
            <p>No tienes postulaciones</p>
          </>
        ) : (
          <aside style={{paddingTop:"1em"}}>
            {listPost.map((p: PostJob) => (
              <article className="rowPost row" key={p._id}>
                <aside className="title">
                  <p className="mb-2">{p.title}</p>
                  <OptionComponent
                    type="state"
                    level="success"
                    label="Publicado"
                    tag={{ nameSkill: "Publicado" }}
                  />
                </aside>
                <aside className="title">
                  <p>
                    {p.postulants > 0
                      ? p.postulants + " personas aplicaron"
                      : "Ninguna persona ha aplicado aún"}
                  </p>
                </aside>
                <aside className="actions">
                  <ButtonComponent
                    family="secondary"
                    link={"/detail-post-company/" + p._id}
                    label="Ver detalles"
                  />
                </aside>
              </article>
            ))}
          </aside>
        )}
      </section>
    </Fragment>
  );
};
