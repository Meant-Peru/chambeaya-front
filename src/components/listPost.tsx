import * as React from "react";
import "./../sass/components/_listPost.scss";
import { BtnPrimary } from "./shared/styled";
import TagComponent from "./shared/atom/tag";

import {useNavigate} from "react-router-dom";

export default function ListPost() {

   const navigate = useNavigate();

   const handleRedirect = ()=>{
    navigate("/detail-post")
    }
    
  return (
    <React.Fragment>
      <section className="ListPostComponent">
        <aside className="mb-5">
          <h1>Últimos Proyectos</h1>
        </aside>
        <aside>
          <article>
            <aside>
              <img src="https://via.placeholder.com/80x80" alt="" />
            </aside>
            <div className="rContent row">
              <aside>
                <div>Diseño y dirección</div>
                <TagComponent label="Destacado" />
              </aside>
              <aside>Lima, Perú</aside>
              <aside>
              <BtnPrimary onClick={handleRedirect} > Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside>
              <img src="https://via.placeholder.com/80x80" alt="" />
            </aside>
            <div className="rContent row">
              <aside>
                <div>Diseño y dirección</div>
                <TagComponent label="Destacado" />
              </aside>
              <aside>Lima, Perú</aside>
              <aside>
                <BtnPrimary onClick={handleRedirect} > Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside>
              <img src="https://via.placeholder.com/80x80" alt="" />
            </aside>
            <div className="rContent row">
              <aside>
                <div>Diseño y dirección</div>
                <TagComponent label="Destacado" />
              </aside>
              <aside>Lima, Perú</aside>
              <aside>
              <BtnPrimary onClick={handleRedirect} > Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside>
              <img src="https://via.placeholder.com/80x80" alt="" />
            </aside>
            <div className="rContent row">
              <aside>
                <div>Diseño y dirección</div>
                <TagComponent label="Destacado" />
              </aside>
              <aside>Lima, Perú</aside>
              <aside>
              <BtnPrimary onClick={handleRedirect} > Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
          <article>
            <aside>
              <img src="https://via.placeholder.com/80x80" alt="" />
            </aside>
            <div className="rContent row">
              <aside>
                <div>Diseño y dirección</div>
                <TagComponent label="Destacado" />
              </aside>
              <aside>Lima, Perú</aside>
              <aside>
              <BtnPrimary onClick={handleRedirect} > Aplicar </BtnPrimary>
              </aside>
            </div>
          </article>
        </aside>
      </section>
    </React.Fragment>
  );
}
