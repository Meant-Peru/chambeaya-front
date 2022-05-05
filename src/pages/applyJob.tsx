import * as React from "react";
import Header from "../components/shared/header";
import "./../sass/pages/_applyJob.scss";
import {
  Txtfield,
  DropdownMenu,
  DropdownItem,
  BtnPrimary,
} from "./../components/shared/styled";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function ApplyJob() {
  return (
    <React.Fragment>
      <Header />
      <section className="applyJob">
        <aside className="coverHeader mb-5">
          <h1 className="mb-2">Diseñador UX/UI</h1>
          <p><i>Empresa Famel SAC</i></p>
        </aside>
        <aside className="contain">
          <Tabs>
            <TabList className={"mb-5"}>
              <Tab>Datos generales</Tab>
              <Tab>Skills</Tab>
              <Tab>Experiencia</Tab>
            </TabList>

            <TabPanel>
              <section className="formApply pt-5">
                <article className="mb-5">
                  <p className="mb-3">Comprobante de pago a emitir</p>
                  <aside className="FormGroup">
                    <DropdownMenu>
                      <DropdownItem>Elige tipo de comprobante </DropdownItem>
                      <DropdownItem>Diseño</DropdownItem>
                      <DropdownItem>Ingeniería</DropdownItem>
                    </DropdownMenu>
                    <Txtfield className="ml-5" placeholder="Nro de documento" />
                  </aside>
                </article>
                <article>
                  <p className="mb-3">Su presupuesto estimado</p>
                  <aside className="FormGroup">
                    <DropdownMenu>
                      <DropdownItem>Eliga tipo de moneda</DropdownItem>
                      <DropdownItem>Diseño</DropdownItem>
                      <DropdownItem>Ingeniería</DropdownItem>
                    </DropdownMenu>
                    <Txtfield className="ml-5" placeholder="Total" />
                  </aside>
                  <p className="mt-2">
                    <i>
                      * Recuerde que el presupuesto estimado por el cliente es
                      de : 2000 soles
                    </i>
                  </p>
                </article>
                <article className="footerSection">
                  <BtnPrimary> Siguiente </BtnPrimary>
                </article>
              </section>
            </TabPanel>
            <TabPanel>
              <section className="formApply pt-5">
                <p>Elige las skills que mejor manejes</p>
                <article className="footerSection">
                  <BtnPrimary> Siguiente </BtnPrimary>
                </article>
              </section>
            </TabPanel>
            <TabPanel>
              <section className="formApply pt-5">
                <p>Enlace digital de experiencia laboral (Certijoven, Linkedin, Web, etc)</p>
                <article className="footerSection">
                  <BtnPrimary> Siguiente </BtnPrimary>
                </article>
              </section>
            </TabPanel>
          </Tabs>
        </aside>
      </section>
    </React.Fragment>
  );
}
