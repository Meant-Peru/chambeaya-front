import * as React from "react";

import Header from "../components/shared/header";
import {
  Txtfield,
  BtnPrimary,
} from "./../components/shared/styled";
import "./../sass/pages/_login.scss";

export default function Login() {
  return (
    <React.Fragment>
      <Header />
      <section className="LoginPage pt-2">
        <h2>Ingresar a la plataforma</h2>
        <aside className="FormGroup mt-5">
          <Txtfield className="mb-3" placeholder="Usuario" />
          <Txtfield
            className="mb-2"
            type={"password"}
            placeholder="Contraseña"
          />
        </aside>
        <aside className="FormGroup">
          <p> <a href="/#">Olvide mi clave</a> </p>
        </aside>
        <aside className="FormAction mt-5">
  
          <BtnPrimary>Login</BtnPrimary>
          <p className="mt-2"><a href="/#">No tienes una cuenta?</a></p>
        </aside>
      </section>
    </React.Fragment>
  );
}
