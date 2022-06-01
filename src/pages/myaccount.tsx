import React, { Fragment, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ButtonComponent from "../components/shared/atom/button";
import Header from "../components/shared/header";
import ilusEmpty from "./../assets/empty-state.svg";
import {
  Txtfield,
  TxtArea,
  DropdownMenu,
  DropdownItem,
} from "../components/shared/styled";
import "./../sass/pages/_myAccount.scss";
import Footer from "../components/shared/footer";

import { GetUser } from "./../util/user.service";
import User, { UserCompanyDetail } from "./../interfaces/User";
import { COMPANY, LIST_SUCCESS, SESSION } from "../helpers/constants";
import { useNavigate , Navigate } from "react-router-dom";


export default function MyAccount() {

  const navigation : any = useNavigate();

  const [postulant, setPostulant] = useState<User>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    rolUser: "",
    sex: "",
    birthDayDate: new Date()
  });
  useEffect(() => {
    (async () => {

      const responsePostulant = await GetUser();

      if (responsePostulant.message === LIST_SUCCESS) {
 
        const userPostulant: User = responsePostulant.data;

        console.log("ahora estoy aqui"+userPostulant.email);

        setPostulant({
          ...postulant,
          name: userPostulant.name,
          lastName: userPostulant.lastName,
          email: userPostulant.email,
          phone: userPostulant.phone,
          rolUser: userPostulant.rolUser,
        });
      }
    })();
  }, []);



  const [company, setCompany] = useState<User>({
    businessName: "",
    email: "",
    phone: "",
    rolUser: "",
    description: "",
    ruc: "",
  });

  useEffect(() => {
    (async () => {
      const responseUser = await GetUser();
      if (responseUser.message === LIST_SUCCESS) {
        const userCompany: UserCompanyDetail = responseUser.data;
        setCompany({
          ...company,
          businessName: userCompany.dataUser.business_name,
          email: userCompany.email,
          phone: userCompany.dataUser.phone,
          rolUser: userCompany.rol,
          description: userCompany.dataUser.description,
          ruc: userCompany.dataUser.ruc,
          web: userCompany.dataUser.web
        });
      }
    })();
  }, []);



  const handleEvent = (e: any) => {
    console.log(e);
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventPostulant = (e: any) => {
    console.log(e);
    setPostulant({
      ...postulant,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = ()=>{
    localStorage.removeItem(SESSION);

    navigation("/login")
  
  }

  return (
    <React.Fragment>
      <Header />
      <section className="myAccountPage">
        <Tabs>
          <TabList className={"mb-5"}>
            <aside className="sideBarMenu mb-5">
              <h3 className="mb-2">Mi Cuenta</h3>
              <span>Gestiona tu cuenta</span>
            </aside>
            <div className="list">
              <Tab>Datos generales</Tab>
              <Tab>Mis postulaciones</Tab>
              <Tab>Proyectos</Tab>
            </div>
            <aside className="sideBarMenu mt-5 mb-5">
              <a onClick={handleLogout}>Cerrar Sesión</a>
            </aside>

          </TabList>

          <TabPanel>
            <section className="sectionAccount">
              {company.rolUser === COMPANY ? (
                <Fragment>
                  <p>Datos primarios</p>
                  <aside className="FormGroup mt-3">
                    <Txtfield
                      onChange={handleEvent}
                      value={company.businessName}
                      name="businessName"
                      placeholder="Nombre de empresa"
                    />
                    <Txtfield
                      onChange={handleEvent}
                      value={company.ruc}
                      name="ruc"
                      placeholder="Nro de Documento"
                    />
                  </aside>
                  <aside className="FormGroup mt-4 mb-4">
                    <TxtArea
                      onChange={handleEvent}
                      value={company.description}
                      name="description"
                      placeholder="Descripción"
                    />
                  </aside>
                  <aside className="FormGroup mt-2 mb-5">
                    <Txtfield
                      onChange={handleEvent}
                      value={company.email}
                      name="email"
                      placeholder="Correo electrónico"
                    />
                    <Txtfield
                      onChange={handleEvent}
                      value={company.phone}
                      name="phone"
                      placeholder="Teléfono"
                    />
                  </aside>
                  
                  <aside>
                    <ButtonComponent type="primary" label="Actualizar" />
                  </aside>
                </Fragment>
              ) : (
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
                    name="lastname"
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
                <p>Datos de Pago</p>
              <aside className="FormGroup mt-3">
                <DropdownMenu>
                  <DropdownItem>Tipo de comprobante</DropdownItem>
                  <DropdownItem>Recibo por Honorarios</DropdownItem>
                  <DropdownItem>Factura</DropdownItem>
                  <DropdownItem>Recibo</DropdownItem>
                </DropdownMenu>
                <Txtfield placeholder="Nro de comprobante" />
              </aside>
              <aside className="FormGroup mt-2 mb-5">
                <DropdownMenu>
                  <DropdownItem>Banco de destino</DropdownItem>
                  <DropdownItem>Banco de Crédito del Perú</DropdownItem>
                  <DropdownItem>BBVA</DropdownItem>
                </DropdownMenu>
                <Txtfield placeholder="Nro de cuenta" />
              </aside>
               
                <aside>
                  <ButtonComponent type="primary" label="Actualizar" />
                </aside>
              </Fragment>
              )}
            </section>
          </TabPanel>
          <TabPanel>
            <section className="apply">
              <img src={ilusEmpty} alt="empty" />
              <p>No se encontraron postulaciones</p>
            </section>
          </TabPanel>
          <TabPanel>
            <section className="proyects">
              <img src={ilusEmpty} alt="empty" />
              <p>Aún no ingresaste a algún proyecto</p>
            </section>
          </TabPanel>
        </Tabs>
      </section>
      <Footer />
    </React.Fragment>
  );
}
