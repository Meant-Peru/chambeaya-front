import React, { useState, useEffect } from "react";
import "./../sass/pages/_detailPost.scss";
import Header from "../components/shared/header";
import toast, { Toaster } from "react-hot-toast";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Modal from "react-modal";
import {
  Txtfield,
  BtnPrimary,
  BtnSecondary,
  TxtArea,
  BtnTable
} from "./../components/shared/styled";

import { useParams } from "react-router-dom";
import { getPosition, createPosition, updatePosition } from "../util/position.service";
import { usePosForm } from "../hooks/usePosition";
import { deleteData } from "../util/delete.service";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  },
};

export default function ListPosiciones() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const idCategory = useParams();
  const { formpos, handleFormPos, resetPos,setFormPos } = usePosForm();
  const [positions, setAllPosition] = useState([]);
  const [edit, setLoadingPost] = useState(false);


const editPosition = (p) => {
	setFormPos(p);
	toggleModal();
  };

const update = async () => {
	await updatePosition(formpos);
	toast.success("Has actualizado la posición");
    closeModal();
    await listPositions();
    resetPos();
}
const listPositions = async () => {
    const responsePosition = await getPosition(idCategory);
    setAllPosition(responsePosition.data);
  };

  useEffect(() => {
    (async () => {    
      await listPositions();
    })();
  }, []);

  formpos.id_category = idCategory.idCategory;

  const submit = async (event: any) => {
    event.preventDefault();
    await createPosition(formpos);
    toast.success("Has registrado una nueva posición!");
    closeModal();
    await listPositions();
    resetPos();
  };

  const toggleModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const deletePosition = async (p) => {
      setLoadingPost(true);
      await deleteData(p, "position");
      await listPositions();
      setLoadingPost(false);
  } 
  
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
	  setEditModalOpen(false);
  }

  
  return (
    <React.Fragment>
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
      <Header />
      <div className="dflex flex-row mt-4 mb-4 algn-center">
        <h2>Posiciones</h2>
        <BtnPrimary onClick={openModal}> Agregar nueva </BtnPrimary>
      </div>
      <div className="dflex flex-row mt-4 mb-4 algn-center">
        <div className="tablePosicions">
          <article className="headerRow">
            <aside className="headerItem">Nombre</aside>
            <aside className="headerItem">Descripción</aside>
            <aside className="headerItem flex-end">Acciones</aside>
          </article>
          {positions.map((e: any) => (
            <div key={e._id}>
              <article className="contentRow" key={e._id}>
                <aside className="contentItem">{e.namePosition}</aside>
                <aside className="contentItem">{e.descriptionPosition}</aside>
                <aside className="contentItem containerButtons">
                  <BtnTable onClick={() => editPosition(e)}>
                    Editar
                  </BtnTable>
                  <BtnTable onClick={() => deletePosition(e)}>
                    Eliminar
                  </BtnTable>
                </aside>
              </article>
            </div>
          ))}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal 
      onRequestClose={toggleModal}
      isOpen={editModalOpen} style={customStyles} overlayClassName="Overlay" ariaHideApp={false}>
        <h2 className="text-center">Editar Posición</h2>
       
		<div className="dflex flex-row mt-4 mb-4 algn-center">
              <Txtfield
                placeholder="Puesto"
                onChange={handleFormPos}
                name="namePosition"
                value={formpos.namePosition}
              />
            </div>
            <div className="dflex flex-row mt-4 mb-4 algn-center">
              <TxtArea
                placeholder="Descripción"
                onChange={handleFormPos}
                name="descriptionPosition"
                value={formpos.descriptionPosition}
              />
            </div>
          <BtnSecondary className="mr-2" onClick={toggleModal}>
            CANCELAR
          </BtnSecondary>
          <BtnPrimary onClick={update} > GUARDAR </BtnPrimary>
  
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-center">Nueva Posición</h2>
        <p className="mt-2 text-center">
          <i>Ingresa nueva posición , relacionalo a una especialidad</i>
        </p>
        <aside className="FormGroup algn-center">
          <form onSubmit={submit}>
            <div className="dflex flex-row mt-4 mb-4 algn-center">
              <Txtfield
                placeholder="Puesto"
                onChange={handleFormPos}
                name="namePosition"
                value={formpos.namePosition}
              />
            </div>
            <div className="dflex flex-row mt-4 mb-4 algn-center">
              <Txtfield
                placeholder="Descripción"
                onChange={handleFormPos}
                name="descriptionPosition"
                value={formpos.descriptionPosition}
              />
            </div>
            <BtnSecondary className="mr-2" onClick={closeModal}>
              CANCELAR
            </BtnSecondary>
            <BtnPrimary type="submit"> GUARDAR </BtnPrimary>
          </form>
        </aside>
      </Modal>
    </React.Fragment>
  );
}
