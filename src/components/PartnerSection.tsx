import React from "react";
import "./../sass/components/_partnerSection.scss";
import logoIpsum from "./../assets/logos/1.svg";

export default function PartnerSection() {
    return (
        <React.Fragment>
   
                <section className="PartnerSection">
                   <article>
                        <h2>Empresas que trabajan <br /> con nosotros</h2>
                        <p>Ellos confían en nuestra plataforma</p>
                   </article>
                   <article>
                        <img src={logoIpsum} alt="" />
                        <img src={logoIpsum} alt="" />
                        <img src={logoIpsum} alt="" />

                        <img src={logoIpsum} alt="" />
                        <img src={logoIpsum} alt="" />
                        <img src={logoIpsum} alt="" />
                   </article>
                </section>
          
        </React.Fragment>
    )
}