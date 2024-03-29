import React, { Fragment, useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Header from "../components/shared/header";
import Modal from "react-modal";
import {
  PostAddOutlined,
  CategoryOutlined,
  BuildOutlined,
  LibraryAddOutlined,
} from "@material-ui/icons";
import {
  Txtfield,
  BtnPrimary,
  BtnTable,
  DropdownMenu,
  DropdownItem,
  BtnSecondary,
  TxtArea,
  BtnMobile,
} from "../components/shared/styled";
import ButtonComponent from "../components/shared/atom/button";
import "./../sass/pages/_myAccount.scss";
import "./../sass/pages/_dashboard.scss";
import Footer from "../components/shared/footer";
import toast, { Toaster } from "react-hot-toast";

import {
  getSkill,
  createSkill,
  enlazarSkill,
  updateSkill,
} from "../util/skill.service";
import { getCategory, createCategory } from "../util/category.service";
import { getPosition } from "../util/position.service";

import { useAuth } from "../hooks/useAuth";
import { usePostJob } from "../hooks/usePostJob";
import { useCatForm } from "../hooks/useCategory";
import { useSkillForm, useEnlForm } from "../hooks/useSkill";

import { POSTULANT } from "../helpers/constants";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { Publications } from "../components/Publications";
import { Companies } from "../components/Companies";


export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { startLogout, startUpdateUser } = useAuth();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenS, setIsOpenSkill] = React.useState(false);
  const [modalIsOpenE, setIsOpenEnl] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { formcat, handleFormCat, resetCat } = useCatForm();
  const { formskill, handleFormSkill, resetSkill, setFormSkill } =
    useSkillForm();
  const { formenl, handleFormEnl, resetEnl } = useEnlForm();

  const {
    postJobsState: { loading, postJobs },
  } = usePostJob();

  const [postulant, setPostulant] = useState({
    ...user.dataUser,
  });
  const [company, setCompany] = useState({
    ...user.dataUser,
  });

  const [skill, setSkill] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allPosition, setAllPosition] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleEventPostulant = (e: any) => {
    setPostulant({
      ...postulant,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    let dataSend;
    if (user.rol === POSTULANT) {
      dataSend = { ...user, dataUser: { ...postulant } };
    } else {
      dataSend = { ...user, dataUser: { ...company } };
    }

    const respUpdate = await startUpdateUser(dataSend);
    console.log({ respUpdate });
  };

  const handleLogout = () => {
    startLogout();
  };
  const listSkills = async () => {
    const responseSkill = await getSkill();
    setSkill(responseSkill.data.data);
  };
  useEffect(() => {
    (async () => {
      listSkills();
      const responseCategory = await getCategory();
      setAllCategory(responseCategory.data.data);
    })();
  }, []);

  const handlePosition = async (event: any) => {
    const value = event.target.value;
    if (value !== "0") {
      const responsePosition = await getPosition({ idCategory: value });
      formenl.idCategory = value;
      setAllPosition(responsePosition.data);
    }
  };
  const editSkill = (s) => {
    console.log(s);
    setFormSkill(s);
    toggleModal();
  };

  const toggleModal = () => {
    setEditModalOpen(!editModalOpen);
  };
  const update = async () => {
    await updateSkill(formskill);
    toast.success("Has actualizado la posición");
    toggleModal();
    await listSkills();
    resetSkill();
  };
  function openModalCategory() {
    setIsOpen(true);
  }

  function closeModalCategory() {
    setIsOpen(false);
  }
  function openModalSkill() {
    setIsOpenSkill(true);
  }

  function closeModalSkill() {
    setIsOpenSkill(false);
  }
  function openModalEnl(event: any) {
    const value = event.target.value;
    formenl.idSkill = value;
    setIsOpenEnl(true);
  }
  function closeModalEnl() {
    setIsOpenEnl(false);
  }
  const submitCategory = async (event: any) => {
    setWarning(false);
    event.preventDefault();
    console.log(formcat);
    if (
      formcat.nameCategory.length === 0 ||
      formcat.descriptionCategory.length === 0
    ) {
      setWarning(true);
    } else {
      await createCategory(formcat);
      toast.success("Has registrado una nueva especialidad!");
      closeModalCategory();
      const responseCategory = await getCategory();
      setAllCategory(responseCategory.data.data);
      resetCat();
    }
  };

  const submitskill = async (event: any) => {
    event.preventDefault();
    console.log(formskill);
    await createSkill(formskill);
    toast.success("Has registrado una nueva skill!");
    closeModalSkill();
    await listSkills();
    resetSkill();
  };

  const submitenl = async (event: any) => {
    event.preventDefault();
    console.log(formenl);
    await enlazarSkill(formenl);
    toast.success("Has enlazado correctamente!");
    closeModalEnl();
    await listSkills();
    resetEnl();
  };

  if (Object.keys(user.dataUser).length === 0)
    return <Navigate replace to="/login" />;

  return (
    <React.Fragment>
      <Header />
      <section className="myAccountPage">
        <Tabs>
          <TabList className={"mb-5"}>
            <aside className="sideBarMenu">
              <h3 className="mb-1">Admin</h3>
              <span className="mb-1">Cuenta de administrador</span>
              <p className="mb-1 mt-1">
                <a onClick={handleLogout}>Cerrar Sesión</a>
              </p>
            </aside>
            <div className="list">
              <Tab>Datos generales</Tab>
              <Tab>Empresas</Tab>
              <Tab>Publicaciones</Tab>

              <Tab>Especialidades</Tab>
              <Tab>Skill</Tab>
            </div>
          </TabList>

          <TabPanel>
            <section className="sectionAccount">
              <Fragment>
                <p>Datos personales</p>
                <aside className="FormGroup mt-3">
                  <Txtfield
                    onChange={handleEventPostulant}
                    value={postulant.name}
                    name="name"
                    placeholder="Nombres"
                  />
                  <Txtfield
                    onChange={handleEventPostulant}
                    value={postulant.lastName}
                    name="lastName"
                    placeholder="Apellidos"
                  />
                </aside>
                <aside className="FormGroup mt-2 mb-5">
                  <Txtfield
                    onChange={handleEventPostulant}
                    value={postulant.email}
                    name="email"
                    placeholder="Correo electrónico"
                  />
                  <Txtfield
                    onChange={handleEventPostulant}
                    value={postulant.phone}
                    name="phone"
                    placeholder="Teléfono"
                  />
                </aside>

                <aside style={{ display: "flex", justifyContent: "center" }}>
                  <BtnPrimary onClick={handleUpdate}>Actualizar</BtnPrimary>
                </aside>
              </Fragment>
            </section>
          </TabPanel>
          <TabPanel>
            <Companies />
          </TabPanel>
          <TabPanel>
            <Publications />
          </TabPanel>

          <TabPanel>
            <div className="usersTable">
              <div className="titleTable">
                <h2>Especialidades</h2>
                <BtnMobile onClick={openModalCategory}>
                  <PostAddOutlined />
                </BtnMobile>
                <BtnPrimary className="notMobile" onClick={openModalCategory}>
                  Agregar nueva
                </BtnPrimary>
              </div>
            </div>
            <div className="tableUsers">
              <article className="headerRow">
                <aside className="headerItem">Nombre</aside>
                <aside className="headerItem">Descripción</aside>
                <aside className="headerItem flex-end">Acciones</aside>
              </article>
              {allCategory.map((e: any) => (
                <article className="contentRow" key={e._id}>
                  <aside className="contentItem">
                    <CategoryOutlined className="contentIcon" />
                    {e.nameCategory}
                  </aside>
                  <aside className="contentItem">{e.descriptionCategory}</aside>
                  <ButtonComponent
                    family="secondary"
                    link={"/list-posiciones/" + e._id}
                    label="Ver posiciones"
                  />
                </article>
              ))}
            </div>
            <Toaster position="top-right" reverseOrder={false} />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModalCategory}
              contentLabel="New Category"
              overlayClassName="Overlay"
              className="ModalContent"
              ariaHideApp={false}
            >
              <div className="ModalContainerText">
                <h2 className="text-center">Nueva Especialidad</h2>
                <p className="mt-2 text-center">
                  <i>
                    Ingresa una nueva especialidad como Diseño, Redes o Base de
                    datos <br />y no te olvides agregar su descripción.
                  </i>
                </p>
                <aside
                  className="FormGroup algn-center"
                  style={{ flexDirection: "column" }}
                >
                  <form onSubmit={submitCategory} style={{ width: "100%" }}>
                    <div className="dflex flex-row mt-4 mb-4 algn-center">
                      <Txtfield
                        placeholder="Nombre"
                        onChange={handleFormCat}
                        name="nameCategory"
                        value={formcat.nameCategory}
                      />
                    </div>
                    <div className="dflex flex-row mt-4 mb-4 algn-center">
                      <TxtArea
                        placeholder="Descripción"
                        onChange={handleFormCat}
                        name="descriptionCategory"
                        value={formcat.descriptionCategory}
                      />
                    </div>
                    <div className="modalButtons">
                      <BtnSecondary
                        className="mr-2"
                        onClick={closeModalCategory}
                      >
                        CANCELAR
                      </BtnSecondary>
                      <br />
                      <BtnPrimary type="submit"> GUARDAR </BtnPrimary>
                    </div>
                  </form>
                  {warning === true && (
                    <p style={{ color: "red", paddingTop: "0.5em" }}>
                      Debes completar el formulario para crear una especialidad.
                    </p>
                  )}
                </aside>
              </div>
            </Modal>
          </TabPanel>
          <TabPanel>
            <div className="usersTable">
              <div className="titleTable">
                <h2>Skills</h2>
                <BtnMobile onClick={openModalSkill}>
                  <LibraryAddOutlined />
                </BtnMobile>
                <BtnPrimary className="notMobile" onClick={openModalSkill}>
                  {" "}
                  Agregar nueva{" "}
                </BtnPrimary>
              </div>
            </div>
            <div className="tableUsers">
              <article className="headerRow">
                <aside className="headerItem">Nombre</aside>
                <aside className="headerItem">Descripción</aside>
                <aside className="headerItem flex-end">Acciones</aside>
              </article>
              {skill.map((e: any) => (
                <article className="contentRow" key={e._id}>
                  <aside className="contentItem">
                    <BuildOutlined className="contentIcon" />
                    {e.nameSkill}
                  </aside>
                  <aside className="contentItem">{e.descriptionskill}</aside>
                  <aside className="containerButtons">
                    <BtnTable value={e._id} onClick={openModalEnl}>
                      Enlazar
                    </BtnTable>
                    <BtnTable onClick={() => editSkill(e)}>Editar</BtnTable>
                  </aside>
                </article>
              ))}
            </div>
            <Toaster position="top-right" reverseOrder={false} />
            <Modal
              isOpen={modalIsOpenS}
              ariaHideApp={false}
              onRequestClose={closeModalSkill}
              contentLabel="New Skill"
              overlayClassName="Overlay"
              className="ModalContent"
            >
              <div className="ModalContainerText">
                <h2 className="text-center">Nueva Skill</h2>
                <p className="mt-2 text-center">
                  <i>Ingresa nueva skill</i>
                </p>
                <aside className="FormGroup algn-center">
                  <form onSubmit={submitskill}>
                    <div className="dflex flex-row mt-4 mb-4 algn-center">
                      <Txtfield
                        placeholder="Skill"
                        onChange={handleFormSkill}
                        name="nameSkill"
                        value={formskill.nameSkill}
                      />
                    </div>
                    <div className="dflex flex-row mt-4 mb-4 algn-center">
                      <TxtArea
                        placeholder="Descripción"
                        onChange={handleFormSkill}
                        name="descriptionskill"
                        value={formskill.descriptionskill}
                      />
                    </div>
                    <div className="modalButtons">
                      <BtnSecondary className="mr-2" onClick={closeModalSkill}>
                        CANCELAR
                      </BtnSecondary>
                      <br />
                      <BtnPrimary type="submit"> GUARDAR </BtnPrimary>
                    </div>
                  </form>
                </aside>
              </div>
            </Modal>
            <Modal
              isOpen={editModalOpen}
              onRequestClose={toggleModal}
              contentLabel="Edit Skill"
              overlayClassName="Overlay"
              className="ModalContent"
              ariaHideApp={false}
            >
              <div className="ModalContainerText">
                <h2 className="text-center">Editar Skill</h2>
                <div className="dflex flex-row mt-4 mb-4 algn-center">
                  <Txtfield
                    placeholder="Skill"
                    onChange={handleFormSkill}
                    name="nameSkill"
                    value={formskill.nameSkill}
                  />
                </div>
                <div className="dflex flex-row mt-4 mb-4 algn-center">
                  <TxtArea
                    placeholder="Descripción"
                    onChange={handleFormSkill}
                    name="descriptionskill"
                    value={formskill.descriptionskill}
                  />
                </div>
                <div className="modalButtons">
                  <BtnSecondary className="mr-2" onClick={toggleModal}>
                    CANCELAR
                  </BtnSecondary>
                  <br />
                  <BtnPrimary onClick={update}> GUARDAR </BtnPrimary>
                </div>
              </div>
            </Modal>

            <Toaster position="top-right" reverseOrder={false} />
            <Modal
              isOpen={modalIsOpenE}
              ariaHideApp={false}
              onRequestClose={closeModalEnl}
              contentLabel="Relation Skill"
              overlayClassName="Overlay"
              className="ModalContent"
            >
              <div className="ModalContainerText">
              <h2 className="text-center">Enlazar Skill</h2>
              <p className="mt-2 text-center">
                <i>Relacionalo a una especialidad y a un puesto</i>
              </p>
              <br />
              <aside className="algn-center">
                <form onSubmit={submitenl}>
                  <div>
                    <DropdownMenu
                      onChange={handlePosition}
                      name="idCategory"
                      value={formenl.idCategory}
                    >
                      <DropdownItem>Eliga la especialidad</DropdownItem>
                      {allCategory.map((e: any) => (
                        <DropdownItem key={e._id} value={e._id}>
                          {e.nameCategory}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                    <DropdownMenu
                      onChange={handleFormEnl}
                      name="idPosition"
                      value={formenl.idPosition}
                    >
                      <DropdownItem>Eliga el puesto</DropdownItem>
                      {allPosition.map((e: any) => (
                        <DropdownItem key={e._id} value={e._id}>
                          {e.namePosition}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </div>
                  <div className="modalButtons">
                    <BtnSecondary className="mr-2" onClick={closeModalEnl}>
                      CANCELAR
                    </BtnSecondary>
                    <br />
                    <BtnPrimary type="submit"> GUARDAR </BtnPrimary>
                  </div>
                </form>
              </aside>
              </div>
            </Modal>
          </TabPanel>
        </Tabs>
      </section>
      <Footer />
    </React.Fragment>
  );
}
