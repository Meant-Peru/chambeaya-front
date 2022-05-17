import * as React from "react";
import Header from "../components/shared/header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CheckButton from "../components/shared/atom/checkButton";
import {
  Txtfield,
  DropdownMenu,
  DropdownItem,
  BtnPrimary,
} from "./../components/shared/styled";
import "react-tabs/style/react-tabs.css";
import "./../sass/pages/_applyJob.scss";
import Footer from "../components/shared/footer";

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
                <article className="gridBox mt-4">
                  <CheckButton withbg="yes" label="Adobe Illustrator" />
                  <CheckButton withbg="yes" label="Figma" />
                  <CheckButton withbg="yes" label="Content" />
                  <CheckButton withbg="yes" label="Photoshop" />
                  <CheckButton withbg="yes" label="Html" />
                  <CheckButton withbg="yes" label="css" />
                  <CheckButton withbg="yes" label="Design Thinking" />
                </article>
                <article className="footerSection">
                  <BtnPrimary> Siguiente </BtnPrimary>
                </article>
              </section>
            </TabPanel>
            <TabPanel>
              <section className="formApply pt-5">
                <article className="mb-5">
                  <p className="mb-3 text-center">
                    Enlace digital de experiencia laboral (Certijoven, Linkedin,
                    Web, etc)
                  </p>
                  <aside className="FormGroup">
                    <DropdownMenu>
                      <DropdownItem>Seleccione tipo de enlace </DropdownItem>
                      <DropdownItem>Diseño</DropdownItem>
                      <DropdownItem>Ingeniería</DropdownItem>
                    </DropdownMenu>
                    <Txtfield className="ml-5" placeholder="Ingrese enlace" />
                  </aside>
                </article>
                <article className="mb-5">
                  <p className="text-center mb-3">
                    ó , coloca tu experiencia respecto al puesto que buscamos
                  </p>
                  <aside className="FormGroup">
                    <Txtfield className="mr-5" placeholder="Empresa" />
                    <Txtfield className="" placeholder="Tiempo de trabajo" />
                  </aside>
                  <aside className="FormGroup-full mt-4">
                    <Txtfield placeholder="Empresa" />
                  </aside>
                </article>

                <article className="footerSection">
                  <BtnPrimary> Aplicar </BtnPrimary>
                </article>
              </section>
            </TabPanel>
          </Tabs>
        </aside>
      </section>
      <Footer />
    </React.Fragment>
  );
}
