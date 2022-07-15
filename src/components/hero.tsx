import * as React from "react";
import "./../sass/components/_hero.scss";
import ButtonComponent from "./shared/atom/button";
import {
  Txtfield,
  DropdownMenu,
  DropdownItem,
  BtnPrimary,
} from "./shared/styled";

import imgCover from "./../assets/imgcover.png"

export default function Hero() {
  return (
    <React.Fragment>
      <div className="secFull">
      <section className="HeroComponent">
        <aside className="cover">
          <article>
            <h1>
              EL INICIO DE TU <br /> PRÓXIMO
              <b> TRABAJO</b>  
              
            </h1>
            <BtnPrimary> Registrarme </BtnPrimary>
          </article>
          <article className="coverImg">
            <img src={imgCover} alt="" />
          </article>
        </aside>
      </section>
      </div>
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
    </React.Fragment>
  );
}
