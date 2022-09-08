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
import {useNavigate} from "react-router-dom";

export default function Hero() {

    const navigate = useNavigate();
    /**
     * Handle redirects to user register form.
     */
    const handleRedirect = () => {
        navigate("/register")
    }
  return (
    <React.Fragment>
      <div className="secFull">
      <section className="HeroComponent">
        <aside className="cover">
          <article>
            <h1>
                <b>EL INICIO DE TU <br /> PRÓXIMO TRABAJO</b>
              
            </h1>
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
            <DropdownItem>Seleccionar Categoría</DropdownItem>
            <DropdownItem>Diseño</DropdownItem>
            <DropdownItem>Ingeniería</DropdownItem>
          </DropdownMenu>
          <ButtonComponent family="primary" label="FILTRAR" />
        </aside>
    </React.Fragment>
  );
}
