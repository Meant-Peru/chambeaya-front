import * as React from "react";
import CheckButton from "../components/shared/atom/checkButton";

import Header from "../components/shared/header";
import {
    Txtfield,
    BtnPrimary,
} from "./../components/shared/styled";
import "./../sass/pages/_register.scss";

export default function Login() {
    return (
        <React.Fragment>
            <Header />
            <section className="RegisterPage pt-2">
                <h2>Registro de nuevo postulante</h2>
                <aside className="FormGroup mt-5">
                    <Txtfield className="mb-3" placeholder="Nombres" />
                    <Txtfield className="mb-2" placeholder="Apellidos"
                    />
                </aside>
                <aside className="FormGroup">
                    <Txtfield type={"email"} className="mb-3" placeholder="Correo electrónico" />
                    <Txtfield type={"tel"} className="mb-2" placeholder="Teléfono / Celular"
                    />
                </aside>

                <aside className="FormGroup">
                    <Txtfield className="mb-3" type={"password"} placeholder="Clave" />
                    <Txtfield className="mb-2" type={"password"} placeholder="Repetir clave"
                    />
                </aside>
                <aside className="FormGroupFull">
                    <CheckButton withbg="no" label="Acepto los Términos y Condiciones" />
                </aside>
                <aside className="FormAction mt-5">    
                    <BtnPrimary>CREAR CUENTA</BtnPrimary>
                    <p className="mt-2"><a href="/login">Ya tienes una cuenta?</a></p>
                </aside>
            </section>
        </React.Fragment>
    );
}
