import * as React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ButtonComponent from "../components/shared/atom/button";
import Header from "../components/shared/header";
import ilusEmpty from "./../assets/empty-state.svg";
import {
  BtnPrimary,
  DropdownItem,
  DropdownMenu,
  Txtfield,
} from "../components/shared/styled";
import "./../sass/pages/_postJob.scss";
import TagComponent from "../components/shared/atom/tag";
import Footer from "../components/shared/footer";

export default function PostJob() {
  return (
    <React.Fragment>
      <Header />
      <section className="postJobPage">
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
                <ButtonComponent type="primary" label="Actualizar" />
              </aside>
            </section>
          </TabPanel>
          <TabPanel>
            <section className="sectionAccount">
              <aside className="mb-5">
               <article className="headSection">
                <h2>Publicaciones</h2>
                <ButtonComponent type="terceary" link="/addJob" label="Nuevo" />
               </article>
                <p>
                  Actualmente tienes un plan gratuito, puede que no puedas
                  colocar visible 2 o más publicaciones.
                </p>
              </aside>

              <aside>
                <article className="rowPost row">
                  <aside className="title">
                    <p className="mb-2">Diseñador UX/UI</p>
                    <TagComponent
                      type="state"
                      level="success"
                      label="Publicado"
                    />
                  </aside>
                  <aside className="title">
                    <p>20 personas postularon</p>
                   
                  </aside>
                  <aside className="actions">
                  <ButtonComponent type="secondary" label="Ver detalles" />
                  </aside>
                </article>
                <article className="rowPost row">
                  <aside className="title">
                    <p className="mb-2">Diseñador UX/UI</p>
                    <TagComponent
                      type="highlight"
                      level="gray"
                      label="Borrador"
                    />
                  </aside>
                  <aside className="title">
                    <p>Aún no visble, revisar planes.</p>
                   
                  </aside>
                  <aside className="actions">
                  <ButtonComponent type="secondary" label="Ver detalles" />
                  </aside>
                </article>
                <article className="rowPost row">
                  <aside className="title">
                    <p className="mb-2">Diseñador UX/UI</p>
                    <TagComponent
                      type="highlight"
                      level="gray"
                      label="Borrador"
                    />
                  </aside>
                  <aside className="title">
                    <p>Aún no visble, revisar planes.</p>
                   
                  </aside>
                  <aside className="actions">
                  <ButtonComponent type="secondary" label="Ver detalles" />
                  </aside>
                </article>
                <article className="rowPost row">
                  <aside className="title">
                    <p className="mb-2">Diseñador UX/UI</p>
                    <TagComponent
                      type="highlight"
                      level="gray"
                      label="Borrador"
                    />
                  </aside>
                  <aside className="title">
                    <p>Aún no visble, revisar planes.</p>
                   
                  </aside>
                  <aside className="actions">
                  <ButtonComponent type="secondary" label="Ver detalles" />
                  </aside>
                </article>
              </aside>
            </section>
            {/* <section className="apply">
              <img src={ilusEmpty} alt="empty" />
              <p>No se encontraron publicaciones</p>
            </section> */}
          </TabPanel>
          <TabPanel>
            <section className="proyects">
              <img src={ilusEmpty} alt="empty" />
              <p>Aún no ingresaste a algún proyecto</p>
            </section>
          </TabPanel>
          <TabPanel>
            <section className="billing">
              <img src={ilusEmpty} alt="empty" />
              <p>Tienes un plan free actualmente</p>
            </section>
          </TabPanel>
        </Tabs>
      </section>
      <Footer />
    </React.Fragment>
  );
}
