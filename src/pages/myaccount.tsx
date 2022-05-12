import * as React from "react";
import ButtonComponent from "../components/shared/atom/button";
import Header from "../components/shared/header";
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
        <aside className="sideBarMenu">
          <h3 className="mb-2">Mi Cuenta</h3>
          <span>Gestiona tu cuenta</span>

          <ul>
            <li className="active">Datos generales</li>
            <li>Mis postulaciones</li>
            <li>Proyectos</li>
          </ul>
        </aside>
        <aside className="sectionAccount">
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
          <ButtonComponent  label="Actualizar" />
          </aside>
        </aside>
      </section>
    </React.Fragment>
  );
}
