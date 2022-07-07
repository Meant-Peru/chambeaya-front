import { TagComponent } from "../components/shared/atom/tag";
import Footer from "../components/shared/footer"
import Header from "../components/shared/header"
import './../sass/pages/_detailPostCompany.scss'
import Logo1 from './../assets/logos/1.svg';
import { BtnPrimary } from "../components/shared/styled";

export const DetailPostCompany = () => {
    return (
        <>
            <Header />
            <section className="detailPostCompanyPage">
                <aside className="coverHeader mb-5">
                    <h1 className="mb-2">Design UI</h1>
                    <p>
                        <i> AE1 SAC </i>
                    </p>
                </aside>
                <aside className="skillTags">
                <TagComponent type="state" level="success" tag={{ nameSkill: 'Skill 1' }} />

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
                            <p> Lorem </p>
                        </div>
                        <hr />
                        <div className="mt-5">
                            <h4 className="mb-3">Funciones</h4>
                            <p>Lorem functions</p>
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

            </section>
            <Footer />
        </>
    );
}