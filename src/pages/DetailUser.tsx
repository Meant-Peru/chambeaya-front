import React, { useEffect, useState } from "react";
import Header from "../components/shared/header";

import "./../sass/pages/_detailProject.scss";
import { KeyboardReturn } from "@material-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Toaster } from "react-hot-toast";
import { DetailUserInteface } from "../interfaces/DetailUserInterface";
import { GetUserById } from "../util/user.service";


export const DetailUser = () => {
  const [loadingDetailPostulant, setLoadingDetailPostulant] = useState(false);
  const { idPostulant } = useParams();
  const [detailUser, setDetailUser] = useState<DetailUserInteface>();
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  const getDataById = async () => {
    setLoadingDetailPostulant(true);
    const r = await GetUserById({ idUser: idPostulant });
    setRol(r.data.rol);
    setDetailUser({ ...r.data.dataUser });
    setLoadingDetailPostulant(false);
  };
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getDataById();
  }, []);

  return (
    <React.Fragment>
      <Backdrop
        open={loadingDetailPostulant}
        style={{
          background: "white",
          zIndex: 99,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <section className="detailProject">
      <div className="containerBack">
              <KeyboardReturn />
              <p onClick={() => goBack()}>Regresar</p>
            </div>
        {rol === "1" ? (
          <div>
            <p>Postulante</p>
            <br />
            <h2 className="accent-color">
              {detailUser?.name} {detailUser?.lastName}
            </h2>
          </div>
        ) : (
          <div>
           
            <div>
              <p>Empresa</p>
            <br />
            <h2 className="accent-color">{detailUser?.businessName}</h2>
            </div>
            
          </div>
        )}

        <hr />
        <aside className="mt-3">
          <h4 className="mb-2">Información</h4>
          <article className="mmlist mb-1 boxContainer ">
            <p>
              <strong>Email: </strong>
              {detailUser?.email}
            </p>
            <br />
            <p>
              <strong>Teléfono: </strong>
              {detailUser?.phone}
            </p>
            <br />
            {rol === "2" ? (
              <p>
                <strong>RUC: </strong>
                {detailUser?.ruc}
              </p>
            ) : (
              <p></p>
            )}

            <br />
          </article>
          <hr />
          <br />
          <h4 className="mb-2">Redes Sociales</h4>
          <article className="mmlist mb-1 boxContainer ">
            <p>
              <strong>Facebook: </strong> </p>
              <p>
              <a href= {detailUser?.facebookURL} target="_blank">
              {detailUser?.facebookURL}
              </a>
              </p>
            <br />
            <p>
              <strong>Linkedin: </strong> </p>
              <p>
              <a href={detailUser?.linkedinURL} target="_blank">
              {detailUser?.linkedinURL}
              </a>
              </p>
              
           
            <br />
            <p>
              <strong>Web: </strong> </p>
            <p>
              <a href={detailUser?.webURL} target="_blank">
              {detailUser?.webURL}
              </a>
            </p> 
            <br />
            <p>
              <strong>Youtube: </strong> </p>
            <p><a href={detailUser?.youtubeURL} target="_blank">
              {detailUser?.youtubeURL}
              </a>
              </p>  
              
           
          </article>
        </aside>
      </section>
    </React.Fragment>
  );
};
