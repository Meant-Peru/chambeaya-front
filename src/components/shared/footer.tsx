import * as React from "react";
import "./../../sass/shared/_footer.scss";
import Logo from "./../../assets/logo.svg";

export default function Footer() {
  return (
    <React.Fragment>
      <footer>
        <section className="footerContent">
          <article>
            <img src={Logo} alt="" className="logoFooter" />
            <p><i>El punto para encontrar proyectos</i></p>
          </article>
          <article>
            <ul>
              <li>Sobre nosotros</li>
              <li>Preguntas frecuentes</li>
              <li>Conversa con nosotros</li>
            </ul>
          </article>
          <article>
            <ul>
              <li>Publica un empleo</li>
              <li>Busca un empleo</li>
              <li>Soy una compañia</li>
            </ul>
          </article>
          <article>
            <ul>
              <li>Facebook</li>
              <li>Linkedin</li>
              <li>Instagram</li>
            </ul>
          </article>
        </section>
      </footer>
    </React.Fragment>
  );
}
