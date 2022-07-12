import { TagComponent } from "../components/shared/atom/tag";
import Footer from "../components/shared/footer"
import Header from "../components/shared/header"
import './../sass/pages/_detailPostCompany.scss'
import Logo1 from './../assets/logos/1.svg';
import { BtnPrimary } from "../components/shared/styled";
import ButtonComponent from "../components/shared/atom/button";

export const DetailPostCompany = () => {
    return (
        <>
            <Header />
            <section className="detailPostCompanyPage">
                <aside className="coverHeader mb-5">
                    <h1 className="mb-2">Product Designer</h1>
                    <p>
                        <i> AE1 SAC </i>
                    </p>
                </aside>
                <aside className="skillTags">
                    <TagComponent type="state" level="success" tag={{ nameSkill: 'UX Writer' }} />
                    <TagComponent type="state" level="success" tag={{ nameSkill: 'Figma' }} />
                </aside>
                <hr />

                <aside className="cardApply mt-5">
                    <article className="imgBrand logoBrand">
                        <img src={Logo1} alt="" />
                    </article>
                    <article className="infoApply">
                        <h4>12 personas aplicaron</h4>
                        <p className="mt-2">10 de Diciembre 2022</p>
                    </article>
                    <article className="actionApply">
                        <BtnPrimary> Ver Postulantes </BtnPrimary>
                        <p className="mt-2">Requerimiento activo</p>
                    </article>
                </aside>

                <aside className="detailsApply mt-5 mb-5">
                    <article className="leftBox">
                        <div className="mb-5">
                            <h4 className="mb-3">Descripción</h4>
                            <p> Famel SAC busca desarrollar sus plataformas de cara el cliente para la compra de sus productos. Para ello requiere de un diseñador para hacer sus interfaces realizando todo un proceso de diseño UX/UI. </p>
                        </div>
                        <hr />
                        <div className="mt-5">
                            <h4 className="mb-3">Funciones</h4>
                            <p>Realizar Benchmark de productos digitales similares <br />
                                Realizar Wireframes de baja/mediana calidad <br />
                                Realizar pruebas de usuario/usabilidad <br />
                                Diseñar interfaces de acuerdo a los requerimientos planteados</p>
                        </div>
                    </article>
                    <article className="rightBox">
                        <h4 className="mb-3">Precisiones</h4>

                        <ul>
                            <li>Duración: 1 mes</li>
                            <li>Presupuesto estimado: S/ 2000</li>
                            <li>Tipo: Presencial</li>
                        </ul>
                    </article>
                </aside>

                <aside>
                    <div>
                        <h4 className="mb-3">Postulantes</h4>
                    </div>
                    <div className="tableUsers">
                        <article className="headerRow">
                            <aside className="headerItem">Postulante</aside>
                            <aside className="headerItem">Similitud</aside>
                            <aside className="headerItem">Acciones</aside>
                        </article>
                        <article className="contentRow">
                            <aside className="contentItem">Jose Sanchez</aside>
                            <aside className="contentItem">90% de similitud</aside>
                            <aside className="contentItem">
                                <ButtonComponent type="secondary" link='/detail-post-company' label="Ver" />
                            </aside>
                        </article>
                        <article className="contentRow">
                            <aside className="contentItem">Maria Saravia</aside>
                            <aside className="contentItem">80% de similitud</aside>
                            <aside className="contentItem">
                                <ButtonComponent type="secondary" link='/detail-post-company' label="Ver" />
                            </aside>
                        </article>
                    </div>
                </aside>

            </section>
            <Footer />
        </>
    );
}