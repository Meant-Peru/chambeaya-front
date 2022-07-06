import * as React from "react";
import "./../sass/components/_hero.scss";
import ButtonComponent from "./shared/atom/button";
import {
  Txtfield,
  DropdownMenu,
  DropdownItem,
} from "./shared/styled";

export default function Hero() {
  return (
    <React.Fragment>
      <section className="HeroComponent">
        <aside className="cover mb-5">
          <h1>
             EL INICIO DE TU PRÓXIMO<br />
             <b> TRABAJO</b>  
          </h1>
        </aside>
        <aside className="filterSection">
          <Txtfield placeholder="Especialidad" />
          <Txtfield placeholder="Ubicación" />
          <DropdownMenu>
            <DropdownItem>Categoría elegida</DropdownItem>
            <DropdownItem>Diseño</DropdownItem>
            <DropdownItem>Ingeniería</DropdownItem>
          </DropdownMenu>
          <ButtonComponent type="primary" label="Filtrar" />
        </aside>
      </section>
    </React.Fragment>
  );
}
