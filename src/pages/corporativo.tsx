import * as React from "react";
import CheckButton from "../components/shared/atom/checkButton";
import Footer from "../components/shared/footer";
import Header from "../components/shared/header";
import { BtnPrimary, Txtfield } from "../components/shared/styled";
import "./../sass/pages/_corporativo.scss";

import CoverCorporativo from "./../assets/coverCorporativo.svg";

import { register } from "./../util/auth.service";
import { useNavigate } from "react-router-dom";
import { CREATE_USER, USER_EXISTING } from "./../helpers/constants";
import {  COMPANY } from "./../helpers/constants";

export default function Corporativo() {
  const navigate = useNavigate();
  const [account, setAccount] = React.useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    lastName: "",
    rolUser: COMPANY,
  });

  const handleRegister = async () => {
    console.log(account);

    const response = await register(account);
    console.log(response);

    if (response.status === 200 && response.data.message === CREATE_USER) {
      navigate("/login");
    }
    if (response.status === 200 && response.data.message === USER_EXISTING) {
      alert("el usuario ya existe");
    }
  };

  const handleEvent = (e: any) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <React.Fragment>
      <Header />
      <section className="corporativoPage">
        <aside className="coverSection">
          <img src={CoverCorporativo} alt="" />
          <span>Únete a las compañias que buscan <strong>resultados.</strong></span>
        </aside>
        <aside className="formRegister">
          <h2>Registro de nueva compañia</h2>
          <aside className="FormGroup mt-5">
            <Txtfield
              className="mb-3"
              onChange={handleEvent}
              name="name"
              placeholder="Ruc"
            />
            <Txtfield
              className="mb-2"
              onChange={handleEvent}
              name="lastName"
              placeholder="Razón Social"
            />
          </aside>
          <aside className="FormGroup">
            <Txtfield
              type={"email"}
              onChange={handleEvent}
              name="email"
              className="mb-3"
              placeholder="Correo electrónico"
            />
            <Txtfield
              type={"tel"}
              onChange={handleEvent}
              name="phone"
              className="mb-2"
              placeholder="Teléfono / Celular"
            />
          </aside>
          <aside className="FormGroup mt-2">
            <Txtfield
              className="mb-3"
              onChange={handleEvent}
              name="password"
              type={"password"}
              placeholder="Clave"
            />
            <Txtfield
              className="mb-2"
              onChange={handleEvent}
              name="confirmPassword"
              type={"password"}
              placeholder="Repetir clave"
            />
          </aside>
          <aside className="FormGroupFull">
            <CheckButton
              withbg="no"
              label="Acepto los Términos y Condiciones"
            />
          </aside>
          <aside className="FormAction mt-5">
            <BtnPrimary onClick={handleRegister}>CREAR CUENTA</BtnPrimary>
            <p className="mt-2">
              <a href="/login">Ya tienes una cuenta?</a>
            </p>
          </aside>
        </aside>
      </section>
      <Footer />
    </React.Fragment>
  );
}
