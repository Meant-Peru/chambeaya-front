import React from "react";
import "./../sass/components/_ctaSection.scss";
import { BtnPrimary } from "./shared/styled";
import {useNavigate} from "react-router-dom";

export default function CtaSection() {

    const navigate = useNavigate();
    /**
     * Handle redirects to user register form.
     */
    const handleRedirect = () => {
        navigate("/register")
    }

    return (
        <React.Fragment>
            <div className="sectionFull">
                <section className="CtaSection">
                    <h2>Descubre opciones seguras de 
                        encontrar <br /> proyectos pensados para tí</h2>
                    <BtnPrimary onClick={handleRedirect}> REGISTRARME </BtnPrimary>
                </section>
            </div>
        </React.Fragment>
    )
}