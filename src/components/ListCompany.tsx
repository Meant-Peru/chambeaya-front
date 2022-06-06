import * as React from "react";
import ButtonComponent from "./shared/atom/button";
import TagComponent from "./shared/atom/tag";

export default function ListCompany() {
    return (
        <React.Fragment>
            <section className="sectionAccount">
                <aside className="mb-5">
                    <article className="headSection">
                        <h2>Cartera de negocios</h2>
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