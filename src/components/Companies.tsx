import { useState, useEffect } from "react";
import {Business,AlternateEmail} from '@material-ui/icons';
import { Backdrop, CircularProgress } from "@material-ui/core";
import { BtnTable } from "../components/shared/styled";
import { getCompanyAll } from "../util/company.service";
import { deleteData } from "../util/delete.service";
import { useNavigate } from 'react-router-dom';

export const Companies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [edit, setLoadingPost] = useState(false);

  const changeRoute = (c) => {
    navigate("/detail-user/" + c);
  }

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
            <aside className="headerItem" style={{textAlign:'center'}}>Acciones</aside>
          </article>
          {companies.map((e: any) => (
            <article className="contentRow" key={e._id}>
              <aside className="contentItem">
                <Business className="contentIcon"/>
                {e.dataUser.businessName}</aside>
              <aside className="contentItem">
              <AlternateEmail className="contentIcon"/>
                {e.dataUser.email}</aside>
              <aside className="containerButtons">
                <BtnTable onClick={() => changeRoute(e._id)}>Ver detalles</BtnTable>
                <BtnTable onClick={() => handleDelete(e)}>Eliminar</BtnTable>
              </aside>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
