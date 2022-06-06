import * as React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./shared/atom/button";
import TagComponent from "./shared/atom/tag";
import { BtnPrimary } from "./shared/styled";

export default function ListCompany() {
    const navigate = useNavigate();
    const handleRedirect = () => {

		navigate('/bussiness')
	  };

    return (
        <React.Fragment>
            <section className="sectionAccount">
                <aside className="mb-5">
                    <article className="headSection dfr jc-sb">
                        <h2>Cartera de negocios</h2>
                        <BtnPrimary onClick={handleRedirect}>CREAR NUEVA CARTERA</BtnPrimary>

                    </article>
                    <p>
                       Tienes # compañias en tu cartera
                    </p>
                </aside>

                <aside>
                    <article className="rowPost row">
                        <aside className="title">
                            <p className="mb-2">Csti Corp</p>
                            <TagComponent
                                type="state"
                                level="success"
                                label="Activo"
                            />
                        </aside>
                        <aside className="title">
                            <p>10483775743</p>
                        </aside>
                        <aside className="actions">
                            <ButtonComponent type="secondary" label="Ver detalles" />
                        </aside>
                    </article>
                </aside>
            </section>
        </React.Fragment>
    )
}