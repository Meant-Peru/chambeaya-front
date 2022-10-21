import { useState } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { BtnTable } from "../components/shared/styled";
import { usePostJob } from "../hooks/usePostJob";
import { deleteData } from "../util/delete.service";

export const Publications = () => {
  const {postJobsState: { loading, postJobs }, getAllJobsData} = usePostJob();
  const [edit, setLoadingPost] = useState(false);

  const handleDelete = async (p) => {
    setLoadingPost(true);
    console.log(p);
    await deleteData(p,"postJob");
    await getAllJobsData()
    setLoadingPost(false);
  };

  if (loading) {
    return <div>Consultando todas las publicaciones...</div>
}
  return (
    <>
    <Backdrop
        open={edit!}
        style={{
          zIndex: 99,
        }}
      >
        {" "}
        .
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="usersTable">
        <h2>Publicaciones</h2>
        <div className="tableUsers">
          <article className="headerRow">
            <aside className="headerItem">Nombre</aside>
            <aside className="headerItem">Empresa</aside>
            <aside className="headerItem">Acciones</aside>
          </article>
          {postJobs.map((e: any) => (
            <article className="contentRow" key={e._id}>
              <aside className="contentItem">{e.title}</aside>
              <aside className="contentItem">
                {e.dataCompany.businessName}
              </aside>
              <aside className="contentItem">
                <BtnTable onClick={() => handleDelete(e)}>Eliminar</BtnTable>
              </aside>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
