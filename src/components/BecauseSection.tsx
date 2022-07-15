import React from "react";
import "./../sass/components/_becauseSection.scss";
import { BtnPrimary } from "./shared/styled";

export default function BecauseSection() {
    return (
        <React.Fragment>
            <section className="BecauseSection">
                <h2>Porque elegirnos</h2>
                <article>
                    <aside> <img src="https://via.placeholder.com/100x90" alt="" /> <h3>No cobramos comisiones</h3></aside>
                    <aside> <img src="https://via.placeholder.com/100x90" alt="" /> <h3>Postulaciones ilimitadas</h3></aside>
                    <aside> <img src="https://via.placeholder.com/100x90" alt="" /> <h3>Pagos garantizados</h3></aside>
                    <aside> <img src="https://via.placeholder.com/100x90" alt="" /> <h3>Todos los oficios a tu alcance</h3></aside>
                </article>
            </section>
        </React.Fragment>
    )
}