import React from "react";
import "./../sass/components/_ctaSection.scss";
import { BtnPrimary } from "./shared/styled";

export default function CtaSection() {
    return (
        <React.Fragment>
            <div className="sectionFull">
                <section className="CtaSection">
                    <h2>Descubre opciones seguras de 
                        encontrar <br /> proyectos pensados para tí</h2>
                    <BtnPrimary> REGISTRARME </BtnPrimary>
                </section>
            </div>
        </React.Fragment>
    )
}