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
            <b>Descubre</b> proyectos nuevos...{" "}
          </h1>
          <h1>
            <b>Atrae</b> talento a tus proyectos ...
          </h1>
        </aside>
        <i>
          Lorem ipsum dolor sLorem ipsum dolor sit amet, consectetur adipiscing
          elitit amet
        </i>
        <aside className="filterSection">
          <Txtfield placeholder="Especialidad" />
          <Txtfield placeholder="Ubicación" />
          <DropdownMenu>
            <DropdownItem>Categoría elegida</DropdownItem>
            <DropdownItem>Diseño</DropdownItem>
            <DropdownItem>Ingeniería</DropdownItem>
          </DropdownMenu>
          <ButtonComponent  label="Filtrar" />
        </aside>
      </section>
    </React.Fragment>
  );
}
