import * as React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ButtonComponent from "../components/shared/atom/button";
import Header from "../components/shared/header";
import ilusEmpty from "./../assets/empty-state.svg";
import {
  DropdownItem,
  DropdownMenu,
  Txtfield,
} from "../components/shared/styled";
import "./../sass/pages/_myAccount.scss";

export default function MyAccount() {
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
          </TabList>

          <TabPanel>
            <section className="sectionAccount">
              <p>Datos personales</p>
              <aside className="FormGroup mt-3">
                <Txtfield placeholder="Nombres" />
                <Txtfield placeholder="Apellidos" />
              </aside>
              <aside className="FormGroup mt-2 mb-5">
                <Txtfield placeholder="Correo electrónico" />
                <Txtfield placeholder="Teléfono" />
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
                <ButtonComponent label="Actualizar" />
              </aside>
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
    </React.Fragment>
  );
}
