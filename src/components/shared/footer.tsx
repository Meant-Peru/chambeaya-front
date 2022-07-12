import * as React from "react";
import "./../../sass/shared/_footer.scss";
import LogoV4 from "./../../assets/logo-v4.svg";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/corporativo")
  };
  
  return (
    <React.Fragment>
      <footer>
        <section className="footerContent">
          <article>
            <img src={LogoV4} alt="" className="logoFooter" />
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
              <li onClick={handleRedirect}>Soy una compañía</li>
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
