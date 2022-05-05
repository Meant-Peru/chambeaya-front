import * as React from "react";
import "./../sass/components/_listPost.scss";
import { BtnPrimary } from "./shared/styled";
import TagComponent from "./shared/atom/tag";

import Logo1 from "./../assets/logos/1.svg";
import Logo2 from "./../assets/logos/2.svg";
import Logo3 from "./../assets/logos/3.svg";
import Logo4 from "./../assets/logos/4.svg";
import Logo5 from "./../assets/logos/6.svg";

import { useNavigate } from "react-router-dom";



export default function ListPost() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/detail-post");
  };

  return (
    <React.Fragment>
      <section className="ListPostComponent">
        <aside className="mb-5">
          <h1>Últimos Proyectos</h1>
        </aside>
        <aside>
          <article>
            <aside className="logoBrand">
              <img src={Logo1} alt="" />
            </aside>
            <div className="rContent row">
              <aside className="title">
                <p>Diseño y dirección</p>
                <TagComponent type="highlight" level="dark" label="Destacado" />
              </aside>
              <aside className="ubication">
                <p>Lima, Perú</p>
              </aside>
              <aside className="actions">
                <BtnPrimary onClick={handleRedirect}> Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside className="logoBrand">
              <img src={Logo2} alt="" />
            </aside>
            <div className="rContent row">
              <aside className="title">
                <p>Product Designer</p>
                <TagComponent type="highlight" level="dark" label="Destacado" />
              </aside>
              <aside className="ubication">
                <p>Washington, EEUU</p>
              </aside>
              <aside className="actions">
                <BtnPrimary onClick={handleRedirect}> Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside className="logoBrand">
              <img src={Logo3} alt="" />
            </aside>
            <div className="rContent row">
              <aside className="title">
                <p>UI Designer</p>
                <TagComponent type="highlight" level="dark" label="Destacado" />
              </aside>
              <aside className="ubication">
                <p>Lima, Perú</p>
              </aside>
              <aside className="actions">
                <BtnPrimary onClick={handleRedirect}> Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside className="logoBrand">
              <img src={Logo4} alt="" />
            </aside>
            <div className="rContent row">
              <aside className="title">
                <p>Desarrollador web</p>
                {/* <TagComponent type="highlight" level="dark" label="Destacado" /> */}
              </aside>
              <aside className="ubication">
                <p>Arequipa, Perú</p>
              </aside>
              <aside className="actions">
                <BtnPrimary onClick={handleRedirect}> Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside className="logoBrand">
              <img src={Logo5} alt="" />
            </aside>
            <div className="rContent row">
              <aside className="title">
                <p>Diseño y dirección</p>
                {/* <TagComponent type="highlight" level="dark" label="Destacado" /> */}
              </aside>
              <aside className="ubication">
                <p>Trujillo, Perú</p>
              </aside>
              <aside className="actions">
                <BtnPrimary onClick={handleRedirect}> Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
        </aside>
      </section>
    </React.Fragment>
  );
}
