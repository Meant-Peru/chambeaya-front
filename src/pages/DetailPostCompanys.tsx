import { Fragment, useEffect, useState } from "react";
import { TagComponent } from "../components/shared/atom/tag";
import Footer from "../components/shared/footer";
import { KeyboardReturn } from "@material-ui/icons";
import Header from "../components/shared/header";
import ButtonComponent from "../components/shared/atom/button";
import "./../sass/pages/_detailPostCompany.scss";
import Logo1 from "./../assets/logos/1.svg";
import { BtnPrimary } from "../components/shared/styled";
import { useParams, useNavigate } from "react-router-dom";
import { usePostCompany } from "../hooks/usePostCompany";
import { ListPostJob, ListSkill, PostulantJob } from "../interfaces/DetailPost";
import { Backdrop, CircularProgress } from "@material-ui/core";

export const DetailPostCompanys = () => {
  const [loadingPost, setLoadingPost] = useState(false);
  const [postJob, setPostJob] = useState<ListPostJob>();
  const [listSkill, setListSkill] = useState<ListSkill[]>([]);
  const [listPostulant, setListPostulant] = useState<PostulantJob[]>([]);
  const { id } = useParams();
  const { startDetailPostCompany } = usePostCompany();
  const navigate = useNavigate();

  useEffect(() => {
    handlerInit();
  }, [id]);

  const handlerInit = async () => {
    setLoadingPost(true);
    const resp = await startDetailPostCompany(id);
    console.log("DetailPostCompanys", resp);
    setPostJob(resp.listPostJob[0]);
    setListSkill([...resp.listSkills]);
    const porcentageSkills = resp.postulants.sort(
      (a, b) => b.porcentageSkills - a.porcentageSkills
    );
    setListPostulant([...porcentageSkills]);
    setLoadingPost(false);
  };
  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <Fragment>
      <Backdrop
        open={loadingPost}
        style={{
          background: "white",
          zIndex: 99,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header />
      <section className="detailPostCompanyPage">
        <div className="containerBack">
          <KeyboardReturn />
          <p onClick={() => goBack()}>Regresar</p>
        </div>
        <aside className="coverHeader mb-4">
          <h1 className="mb-2">{postJob?.title}</h1>
          <p>
            <i> {postJob?.dataCompany.businessName} </i>
          </p>
        </aside>
        <aside className="skillTags">
          {listSkill.map((s: ListSkill) => (
            <TagComponent key={s._id} type="state" level="success" tag={s} />
          ))}
        </aside>
        <hr />

        <aside className="cardApply mt-5">
          <article className="imgApply">
            <img src={Logo1} alt="" />
          </article>
          <article className="infoApply">
            <h4>
              {listPostulant.length > 0
                ? listPostulant.length + " personas aplicaron"
                : "Ninguna persona ha aplicado aún"}
            </h4>
          </article>
          <article className="actionApply">
            <a href="#postulantsList">
              <BtnPrimary>Ver Postulantes</BtnPrimary>
            </a>

            <p className="mt-2">
              Requerimiento {postJob?.state ? "activo" : "no activo"}
            </p>
          </article>
        </aside>

        <aside className="detailsApply">
          <article className="leftBox">
            <div className="containerText">
              <h4>Descripción</h4>
              <p> {postJob?.descriptionPost} </p>
            </div>
            <hr />
            <div className="containerText">
              <h4>Funciones</h4>
              <p>{postJob?.funtionsPost}</p>
            </div>
          </article>
          <article className="rightBox">
            <h4>Precisiones</h4>
            <ul>
              <li>Duración: {postJob?.timeEstimated}</li>
              <li>Presupuesto estimado: S/ {postJob?.salaryRange}</li>
              <li>Tipo: {postJob?.modality}</li>
            </ul>
          </article>
        </aside>

        {listPostulant.length > 0 && (
          <aside>
            <div>
              <h4 className="mb-3" id="postulantsList">
                Postulantes
              </h4>
            </div>
            <div className="tableUsers">
              <article className="headerRow">
                <aside className="headerItem">Postulante</aside>
                <aside className="headerItem">Similitud</aside>
                <aside className="headerItem">Pretensiones Salariales</aside>
                <aside className="headerItem">Acciones</aside>
              </article>

              {listPostulant.map((p: PostulantJob) => (
                <article className="contentRow" key={p._id}>
                  <aside className="contentItem">
                    {p.namePostulant} {p.lastNamePostulant}
                  </aside>
                  <aside className="contentItem">
                    {p.porcentageSkills.toFixed(2)} %
                  </aside>
                  <aside className="contentItem">S/ {p.amountEstimated} </aside>
                  <aside className="contentItem">
                    <ButtonComponent
                      family="primary"
                      link={`/detail-post-postulant/${p.idPostJob}/${p.idPostulant}`}
                      label="Ver"
                    />
                  </aside>
                </article>
              ))}
            </div>
          </aside>
        )}
      </section>
      <Footer />
    </Fragment>
  );
};
