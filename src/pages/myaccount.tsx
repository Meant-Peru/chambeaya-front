import React, { Fragment, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ButtonComponent from "../components/shared/atom/button";
import Header from "../components/shared/header";
import ilusEmpty from "./../assets/empty-state.svg";
import {
  Txtfield,
  TxtArea,
} from "../components/shared/styled";
import "./../sass/pages/_myAccount.scss";
import Footer from "../components/shared/footer";

import { GetUser } from "./../util/user.service";
import User, { UserDetail } from "./../interfaces/User";
import { COMPANY, LIST_SUCCESS, SESSION } from "../helpers/constants";
import { useNavigate , Navigate } from "react-router-dom";


export default function MyAccount() {

  const navigation : any = useNavigate();

  
  const [user, setUser] = useState<User>({
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
        const userDetail: UserDetail = responseUser.data;
        setUser({
          ...user,
          businessName: userDetail.dataUser.business_name,
          email: userDetail.email,
          phone: userDetail.dataUser.phone,
          rolUser: userDetail.rol,
          description: userDetail.dataUser.description,
          ruc: userDetail.dataUser.ruc,
        });
      }
    })();
  }, []);



  const handleEvent = (e: any) => {
    console.log(e);
    setUser({
      ...user,
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
              {user.rolUser === COMPANY ? (
                <Fragment>
                  <p>Datos personales</p>
                  <aside className="FormGroup mt-3">
                    <Txtfield
                      onChange={handleEvent}
                      value={user.businessName}
                      name="businessName"
                      placeholder="Nombre de empresa"
                    />
                    <Txtfield
                      onChange={handleEvent}
                      value={user.ruc}
                      name="ruc"
                      placeholder="Nro de Documento"
                    />
                  </aside>
                  <aside className="FormGroup mt-4 mb-4">
                    <TxtArea
                      onChange={handleEvent}
                      value={user.description}
                      name="description"
                      placeholder="Descripción"
                    />
                  </aside>
                  <aside className="FormGroup mt-2 mb-5">
                    <Txtfield
                      onChange={handleEvent}
                      value={user.email}
                      name="email"
                      placeholder="Correo electrónico"
                    />
                    <Txtfield
                      onChange={handleEvent}
                      value={user.phone}
                      name="phone"
                      placeholder="Teléfono"
                    />
                  </aside>
                  {/* <p>Datos de Pago</p>
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
              </aside> */}
                  <aside>
                    <ButtonComponent type="primary" label="Actualizar" />
                  </aside>
                </Fragment>
              ) : (
                <Fragment>Holis</Fragment>
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
