import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSales } from "../hooks/useSales";
import { RootState } from "../redux/store/store";
import ButtonComponent from "./shared/atom/button";
import { TagComponent } from "./shared/atom/tag";
import { BtnPrimary, BtnSecondary } from "./shared/styled";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { deleteData } from "../util/delete.service";

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
      <section className="sectionAccount">
        <aside className="mb-5">
          <article className="headSection dfr jc-sb">
            <h2>Cartera de negocios</h2>
            <BtnPrimary onClick={handleRedirect}>
              CREAR NUEVA CARTERA
            </BtnPrimary>
          </article>
          <p>Tienes {companies?.length ?? 0} compañias en tu cartera</p>
        </aside>

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
