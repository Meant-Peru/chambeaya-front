import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSales } from "../hooks/useSales";
import { RootState } from "../redux/store/store";
import ButtonComponent from "./shared/atom/button";
import { TagComponent } from "./shared/atom/tag";
import { BtnPrimary, BtnSecondary ,BtnMobile } from "./shared/styled";
import { Backdrop, CircularProgress } from "@material-ui/core";
import {
  Loupe
} from "@material-ui/icons";
import { deleteData } from "../util/delete.service";
import "./../sass/pages/_postJob.scss";

export default function ListCompany() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/bussiness");
  };
  const { startGetCompanies } = useSales();
  const { companies } = useSelector((state: RootState) => state.sales);
  const [edit, setLoadingPost] = useState(false);

  const deleteCompany = async (c) => {
    setLoadingPost(true);
    await deleteData(c, "users");
    await listCompaniesSales();
    setLoadingPost(false);
  };

  useEffect(() => {
    listCompaniesSales();
  }, []);

  const listCompaniesSales = async () => await startGetCompanies();

  return (
    <Fragment>
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
      <section className="">
        <aside className="usersTable">
          <article className="titleTable">
            <h2>Cartera de negocios</h2>
            <BtnMobile onClick={handleRedirect}>
              <Loupe />
            </BtnMobile>
            <BtnPrimary  className="notMobile" onClick={handleRedirect}>
             Nueva cartera
            </BtnPrimary>
          </article>
         
        </aside>
        <p>Tienes {companies?.length ?? 0} compañias en tu cartera</p>
        <div>
          {companies.map((company) => (
            <aside key={company._id}>
              <article className="rowPost row">
                <aside className="title">
                  <p className="mb-2">{company.dataUser.businessName}</p>
                  <TagComponent tag={{ nameSkill: "Activo" }} />
                </aside>
                <aside className="title">
                  <p>{company.dataUser.ruc}</p>
                </aside>
                <aside className="actions">
                  <ButtonComponent
                    link={"/detail-user/" + company._id}
                    family="secondary"
                    label="Ver detalles"
                  />
                  <br/>
                  <BtnSecondary onClick={() => deleteCompany(company)}>Eliminar</BtnSecondary>
                </aside>
              </article>
            </aside>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
