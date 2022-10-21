import { useState, useEffect } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { BtnTable } from "../components/shared/styled";
import { getCompanyAll } from "../util/company.service";
import { deleteData } from "../util/delete.service";

export const Companies = () => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [edit, setLoadingPost] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getAllCompaniesData();
      setLoading(false);
    })();
  }, []);

  const getAllCompaniesData = async () => {
    const allCompany = await getCompanyAll();
    setCompanies(allCompany.data.data);
  };

  const handleDelete = async (c) => {
    setLoadingPost(true);
    await deleteData(c, "users");
    await getAllCompaniesData();
    setLoadingPost(false);
  };

  if (loading) {
    return <div>Consultando las empresas..</div>;
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
        <h2>Empresas</h2>
        <div className="tableUsers">
          <article className="headerRow">
            <aside className="headerItem">Razón social</aside>
            <aside className="headerItem">Correo</aside>
            <aside className="headerItem">Acciones</aside>
          </article>
          {companies.map((e: any) => (
            <article className="contentRow" key={e._id}>
              <aside className="contentItem">{e.dataUser.businessName}</aside>
              <aside className="contentItem">{e.dataUser.email}</aside>
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
