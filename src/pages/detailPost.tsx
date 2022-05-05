import * as React from "react";
import "./../sass/pages/_detailPost.scss";

import Header from "../components/shared/header";
import TagComponent from "../components/shared/atom/tag";
import ButtonComponent from "../components/shared/atom/button";
import CardPost from "../components/shared/cardPost";

export default function ListPost() {
  return (
    <React.Fragment>
      <Header />
      <section className="DetailPostComponent">
        <aside className="coverHeader mb-5">
          <h1 className="mb-2">Diseñador UX/UI</h1>
          <p>Empresa Famel SAC</p>
        </aside>
        <aside className="skillTags">
          <TagComponent type="highlight" level="secondary" label="Figma" />
          <TagComponent
            type="highlight"
            level="secondary"
            label="Motion Design"
          />
          <TagComponent type="highlight" level="secondary" label="Research" />
          <TagComponent type="highlight" level="secondary" label="UX Writer" />
        </aside>
        <hr />
        <aside className="cardApply mt-5">
          <article className="imgBrand">
            <img src="https://via.placeholder.com/100x90" alt="" />
          </article>
          <article className="infoApply">
            <h4>12 personas aplicaron</h4>
            <p className="mt-2">10 de Diciembre 2022</p>
          </article>
          <article className="actionApply">
            <ButtonComponent label="APLICAR" />
            <p className="mt-2">Requerimiento activo</p>
          </article>
        </aside>
        <aside className="detailsApply mt-5 mb-5">
          <article className="leftBox">
            <div className="mb-5">
              <h4 className="mb-3">Descripción</h4>
              <p>
                Famel SAC busca desarrollar sus plataformas de cara el cliente
                para la compra de sus productos. Para ello requiere de un
                diseñador para hacer sus interfaces realizando todo un proceso
                de diseño UX/UI.
              </p>
            </div>
            <hr />
            <div className="mt-5">
              <h4 className="mb-3">Funciones</h4>
              <p>
                * Realizar Benchmark de productos digitales similares
                * Realizar Wireframes de baja/mediana calidad 
                * Realizar pruebas de usuario/usabilidad
                * Diseñar interfaces de acuerdo a los
                requerimientos planteados
              </p>
            </div>
          </article>
          <article className="rightBox">
            <h4 className="mb-3">Presiciones</h4>
         
              <ul>
                <li>Duración: 1 mes </li>
                <li>Presupuesto estimado: 2000 Soles </li>
                <li>Tipo: Híbrido</li>
              </ul>

          </article>
        </aside>

        <aside className="postRelated mt-5">
          <h2 className="mb-5">Publicaciones Similares</h2>
          <CardPost/>
        </aside>
      </section>
    </React.Fragment>
  );
}
