import * as React from "react";

import Header from "../components/shared/header";
import { SESSION, USER_OR_PASSWORD_NOT_EXISTING } from "./../helpers/constants";
import { useNavigate,useLocation } from "react-router-dom";
import { Txtfield, BtnPrimary } from "./../components/shared/styled";

import "./../sass/pages/_login.scss";

import { auth } from "./../util/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({ email: "", password: "" });

  const handleRedirect = async () => {
    console.log(user);
    const response = await auth(user);
    console.log(response);

    if (
      response.status === 200 &&
      response.data.message !== USER_OR_PASSWORD_NOT_EXISTING
    ) {
      localStorage.setItem(SESSION, response.data.data.token)
      navigate("/myaccount");
    } else {
      alert("No encontrado");
    }
  };

  const handleEvent = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <Header />
      <section className="LoginPage pt-2">
        <h2>Ingresar a la plataforma</h2>
        <aside className="FormGroup mt-5">
          <Txtfield
            onChange={handleEvent}
            name="email"
            className="mb-3"
            placeholder="Usuario"
          />
          <Txtfield
            onChange={handleEvent}
            name="password"
            className="mb-2"
            type={"password"}
            placeholder="Contraseña"
          />
        </aside>
        <aside className="FormGroup">
          <p>
            {" "}
            <a href="/#">Olvide mi clave</a>{" "}
          </p>
        </aside>
        <aside className="FormAction mt-5">
          <BtnPrimary onClick={handleRedirect}>Login</BtnPrimary>
          <p className="mt-2">
            <a href="/#">No tienes una cuenta?</a>
          </p>
        </aside>
      </section>
    </React.Fragment>
  );
}
