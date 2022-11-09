import React, { useEffect, useState } from "react";
import Footer from "../components/shared/footer";
import Header from "../components/shared/header";
import "./../sass/pages/_detailProject.scss";
import time from "./../assets/time.svg";
import { DropzoneDialog } from "material-ui-dropzone";
import toast, { Toaster } from "react-hot-toast";
import avance from "./../assets/avance.jpeg";

import yape from "./../assets/yape.png";
import plin from "./../assets/plin.png";
import ButtonComponent from "../components/shared/atom/button";
import { Backdrop, CircularProgress } from "@material-ui/core";

import Modal from "react-modal";
import { useParams } from "react-router-dom";
import {
  getDetailProjectsId,
  uploadProjectReceipt,
  uploadProjectTimeline,
} from "../util/company.service";
import { GetUserById } from "../util/user.service";

import { DetailProjectInteface } from "../interfaces/DetailProjectInteface";
import { ModalComponent } from "../components/ModalComponent";
import { useUi } from "../hooks/useUi";
import { POSTULANT, USER } from "../helpers/constants";
import { getLocalStorage } from "../helpers/localStorage";
import { URI } from "../enviroment/enviroment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const DetailProyecto = () => {
  const { rol } = getLocalStorage(USER);
  //Dropzone comprobantes
  const [dropzone, setDropzone] = useState(false);
  //Dropzone cronograma
  const [open, setOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [loadingDetailProject, setLoadingDetailProject] = useState(true);
  const [detailProject, setDetailProject] = useState<DetailProjectInteface>();
  const [nameCompany, setNameCompany] = useState("");
  const { idProject } = useParams();
  const { changeStateModal } = useUi();

  useEffect(() => {
    getProjectsId();
  }, []);

  const getProjectsId = async () => {
    const resp = await getDetailProjectsId({ id: idProject });
    console.log("detailproject", resp);
    setDetailProject({ ...resp });
    await getNameCompany(resp.idCompany);
    setLoadingDetailProject(false);
  };

  const openModal = () => changeStateModal(true);

  const closeModal = () => changeStateModal(false);

  const handlerUploadReceipt = async (files: File[]) => {
    setLoadingDetailProject(true);
    const formData = new FormData();
    formData.append("id", idProject);
    formData.append("image", files[0]);
    setDropzone(false);
    const status = await uploadProjectReceipt(formData);
    setLoadingDetailProject(false);
    if (status) {
      toast.success("Se cargo el comprobante correctamente");
    } else {
      toast.error("Error en subir el comprobante!");
    }
  };
  const handlerUploadTimeline = async (files: File[]) => {
    setLoadingDetailProject(true);
    const formData = new FormData();
    formData.append("id", idProject);
    formData.append("image", files[0]);
    setDropzone(false);
    const status = await uploadProjectTimeline(formData);
    setLoadingDetailProject(false);
    if (status) {
      toast.success("Se cargo el cronograma correctamente");
    } else {
      toast.error("Error en subir el cronograma!");
    }
  };

  const getNameCompany = async (id) => {
    const d = await GetUserById({ idUser: id });
    setNameCompany(d.data.dataUser.businessName);
    console.log(d.data.dataUser.businessName);
  };

  return (
    <React.Fragment>
      <Backdrop
        open={loadingDetailProject}
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
        <p>Detalle de Proyecto</p>
        <br />
        <h2 className="accent-color">{detailProject?.projectTitle}</h2>
        <hr />
        <aside className="mt-3">
          <h4>Empresa contratante: {nameCompany}</h4>
        </aside>
        <aside className="mt-3">
          <h4>Perfil contratado</h4>
          <p>
            El perfil fue elegido por afinidad a su requerimiento y validado
            para el desarrollo de su proyecto
          </p>
        </aside>
        <aside className="cardPostulant mt-3">
          <div className="cont1">
            <strong className="mb-1">
              {detailProject?.postulant.dataUser.name}{" "}
              {detailProject?.postulant.dataUser.lastName}
            </strong>
            <i>{detailProject?.projectTitle}</i>
          </div>
          <div>
            <ButtonComponent
              family="primary"
              link={`/detail-user/${detailProject?.idPostulant}`}
              label="Ver"
            />
          </div>
        </aside>
        <aside className="mt-3">
          {rol !== POSTULANT && (
            <>
            </>
          )}

          <h4 className="mt-5">Proyecto en curso</h4>
          <p>
            Se ha establecido un cronograma de trabajo para constatar el estatus
            del proyecto.
          </p>
          {/*<img src={avance}/>*/}
          {/*<article className="mt-4">*/}
          {/*  <ButtonComponent*/}
          {/*    onPress={() => setOpen(true)}*/}
          {/*    type="Dropzone"*/}
          {/*    family="secondary"*/}
          {/*    icon="whitOutIcon"*/}
          {/*    label="ACTUALIZAR AVANCE"*/}
          {/*  />*/}
          {/* */}
          {/*</article>*/}

          <ModalComponent indentifier={1}>
            <section className="containerModal">
              <aside className="headModal">
                <h2>Pagar con monederos</h2>
              </aside>
              <aside className="contentModal">
                <p>Recuerde que puede hacer pagos en 1 o más transacciones</p>
                <strong>Titular: Chambea Ya S.A.C</strong>
                <article className="mt-4">
                  <img src={yape} alt="" />
                  <img src={plin} alt="" />
                </article>
              </aside>
              <button className="btnComponent--primary" onClick={closeModal}>
                Listo
              </button>
            </section>
          </ModalComponent>
          <Modal
            isOpen={modalIsOpen2}
            style={customStyles}
            ariaHideApp={false}
            overlayClassName="Overlay"
          >
            <section className="containerModal">
              <aside className="headModal">
                <h2>Transferencia Bancaria</h2>
              </aside>
              <aside className="contentModal">
                <p>Recuerde que puede hacer pagos en 1 o más transacciones</p>
                <strong>Titular: Chambea Ya S.A.C</strong>
                <article className="col mt-4 mb-2">
                  <ul>
                    <li>BCP: 192-232323-2321</li>
                    <li>BBVA: 34-24323231</li>
                    <li>INTERBANK: 92-24323231</li>
                  </ul>
                </article>
              </aside>
              <button
                className="btnComponent--primary"
                onClick={() => setModalIsOpen2(false)}
              >
                Listo
              </button>
            </section>
          </Modal>
          <DropzoneDialog
            open={dropzone}
            onSave={(files: File[]) => handlerUploadReceipt(files)}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={() => setDropzone(false)}
            dialogTitle="Subir comprobantes de pago"
            dropzoneText="Arrastre y suelte su comprobante aquí o haga click"
            cancelButtonText="Cancelar"
            submitButtonText="Subir"
          />

          <DropzoneDialog
            open={open}
            onSave={(files: File[]) => handlerUploadTimeline(files)}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp", ".pdf"]}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={() => setOpen(false)}
            dialogTitle="Cronograma de trabajo"
            dropzoneText="Arrastre y suelte el cronograma o haga click"
            cancelButtonText="Cancelar"
            submitButtonText="Subir"
          />
        </aside>
      </section>
      <Footer />
    </React.Fragment>
  );
};
