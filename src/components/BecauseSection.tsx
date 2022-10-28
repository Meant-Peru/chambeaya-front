import React from "react";
import "./../sass/components/_becauseSection.scss";
import img1 from "./../assets/no-comisiones.svg"
import img2 from "./../assets/postulaciones.svg"
import img3 from "./../assets/pagos-garantizados.svg"
import img4 from "./../assets/todos-oficios.svg"

export default function BecauseSection() {
    return (
        <React.Fragment>
            <section className="BecauseSection">
                <h2>Beneficios de ser un Chambero Latam</h2>
                <article>
                    <aside> <img src={img1} alt="" /> <h3>No cobramos comisiones</h3></aside>
                    <aside> <img src={img2} alt="" /> <h3>Postular a chambas ilimitadas</h3></aside>
                    <aside> <img src={img3} alt="" /> <h3>Pagos garantizados</h3></aside>
                    <aside> <img src={img4} alt="" /> <h3>Todas las chambas a tu alcance</h3></aside>
                </article>
            </section>
        </React.Fragment>
    )
}