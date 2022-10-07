import * as React from "react";
import "./../../sass/shared/_footer.scss";
import LogoV4 from "./../../assets/Icon_.png";
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
          </article>
          <article>
            <ul>
              <li>Publicar un empleo</li>
              <li>Buscar un empleo</li>
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
