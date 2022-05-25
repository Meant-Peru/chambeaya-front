import * as React from "react";
import Header from "../components/shared/header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import boxEmpty from "./../assets/box-empty.svg";
import ilusEmpty from "./../assets/empty-state.svg";

import { Hint } from 'react-autocomplete-hint';

import {
  Txtfield,
  DropdownMenu,
  DropdownItem,
  TxtArea,
} from "./../components/shared/styled";
import "react-tabs/style/react-tabs.css";
import "./../sass/pages/_addJob.scss";
import Footer from "../components/shared/footer";
import ButtonComponent from "../components/shared/atom/button";

import { addJob } from "./../util/job.service";

export default function AddJob() {

  const options = ["orange", "banana", "apple"];

  const [text, setText] = React.useState("");

  const [job, setJob] = React.useState({
    description: "",
    idCompany: "",
    modality: "",
    timeEstimated: "",
    salaryRange: "",
    funtionsPost: "",
    idCategory: "",
    idPosition: "",
    idSkills: "",
  });

  const handleEvent = (e: any) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <React.Fragment>
      <Header />
      <section className="addJobPage">
        <Tabs defaultIndex={1}>
          <TabList className={"mb-5"}>
            <aside className="sideBarMenu mb-5">
              <h3 className="mb-2">Mi Cuenta</h3>
              <span>Gestiona tu cuenta</span>
            </aside>
            <div className="list">
              <Tab>Datos generales</Tab>
              <Tab>Mis publicaciones</Tab>
              <Tab>Proyectos</Tab>
              <Tab>Facturación</Tab>
            </div>
          </TabList>

          <TabPanel>
            <section className="sectionTab">
              <aside className="mb-5">
                <article className="headSection">
                  <h2>Datos Generales</h2>
                </article>
              </aside>

              <p>Datos Personales</p>
              <aside className="FormsRow mt-3">
                <Txtfield
                  onChange={handleEvent}
                  name="name"
                  placeholder="Nombres"
                />
                <Txtfield placeholder="Apellidos" />
              </aside>

              <aside className="FormsRow mt-2 mb-5">
                <Txtfield placeholder="Correo electrónico" />
                <Txtfield placeholder="Teléfono" />
              </aside>

              <p>Datos de Pago</p>
              <aside className="FormsRow mt-3">
                <DropdownMenu>
                  <DropdownItem>Tipo de comprobante</DropdownItem>
                  <DropdownItem>Recibo por Honorarios</DropdownItem>
                  <DropdownItem>Factura</DropdownItem>
                  <DropdownItem>Recibo</DropdownItem>
                </DropdownMenu>
                <Txtfield placeholder="Nro de comprobante" />
              </aside>
              <aside className="FormsRow mt-2 mb-5">
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
            </section>
          </TabPanel>
          <TabPanel>
            <section className="sectionTab">
              <aside className="mb-5">
                <article className="headSection">
                  <h2>Nueva publicación</h2>
                </article>
              </aside>
              <aside className="FormsRow">
                <aside className="FormGroup mt-3">
                  <p>Rubro</p>
                  <DropdownMenu>
                    <DropdownItem>Elegir rubro</DropdownItem>
                    <DropdownItem>Diseño</DropdownItem>
                    <DropdownItem>Ingeniería</DropdownItem>
                  </DropdownMenu>
                </aside>
                <aside className="FormGroup mt-3">
                  <p>Posición</p>
                  <Txtfield placeholder="Posición" />
                </aside>
              </aside>
              <aside className="FormsRow">
                <aside className="FormGroup mt-3">
                  <p>Prueba</p>
                  
                  <Hint options={options}>
                      <input
                          value={text}
                          onChange={e => setText(e.target.value)} />
                  </Hint>


                </aside>
              </aside>
              <aside className="FormsRow">
                <aside className="FormGroup mt-3">
                  <p>Skills</p>
                  <article className="skillsBox">
                    <img src={boxEmpty} alt="empty" />
                    <p>Ingrese la posición para cargar skills</p>
                  </article>
                </aside>
              </aside>
              <aside className="FormsRow">
                <aside className="FormGroup--full mt-3">
                  <p>Descripción</p>
                  <TxtArea placeholder="Descripción de la publicación" />
                </aside>
              </aside>
              <aside className="FormsRow">
                <aside className="FormGroup--full mt-3">
                  <p>Funciones</p>
                  <TxtArea placeholder="Funciones a desempeñar" />
                </aside>
              </aside>
              <aside className="mt-5">
                <h4>Precisiones</h4>
                <aside className="FormsRow">
                  <aside className="FormGroup mt-3">
                    <p>Duración</p>
                    <Txtfield placeholder="Duración de proyecto" />
                  </aside>
                  <aside className="FormGroup mt-3">
                    <p>Presupuesto</p>
                    <Txtfield placeholder="Presupuesto " />
                  </aside>
                  <aside className="FormGroup mt-3">
                    <p>Modalidad</p>
                    <DropdownMenu>
                      <DropdownItem>Elegir modalidad</DropdownItem>
                      <DropdownItem>Híbrido</DropdownItem>
                      <DropdownItem>Presencial</DropdownItem>
                      <DropdownItem>Remoto</DropdownItem>
                    </DropdownMenu>
                  </aside>
                </aside>
              </aside>
              <aside className="mt-5">
                <ButtonComponent type="primary" label="Agregar" />
              </aside>
            </section>
            {/* <section className="apply">
              <img src={ilusEmpty} alt="empty" />
              <p>No se encontraron publicaciones</p>
            </section> */}
          </TabPanel>
          <TabPanel>
            <section className="sectionTab">
              <aside className="mb-5">
                <article className="headSection">
                  <h2>Proyectos</h2>
                </article>
              </aside>
              <aside className="FormsRow">
                <article className="proyects">
                  <img src={ilusEmpty} alt="empty" />
                  <p>Aún no ingresaste a algún proyecto</p>
                </article>
              </aside>
            </section>
          </TabPanel>
          <TabPanel>
            <section className="sectionTab">
              <aside className="mb-5">
                <article className="headSection">
                  <h2>Facturación</h2>
                </article>
              </aside>
              <aside className="FormsRow">
                <article className="proyects">
                  <img src={ilusEmpty} alt="empty" />
                  <p>Tienes un plan free actualmente</p>
                </article>
              </aside>
            </section>
          </TabPanel>
        </Tabs>
      </section>
      <Footer />
    </React.Fragment>
  );
}
