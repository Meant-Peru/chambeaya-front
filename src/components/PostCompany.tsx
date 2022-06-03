import * as React from "react";
import ButtonComponent from "./shared/atom/button";
import TagComponent from "./shared/atom/tag";

export default function PostCompany() {
    return (
        <React.Fragment>
            <section className="sectionAccount">
                <aside className="mb-5">
                    <article className="headSection">
                        <h2>Publicaciones</h2>
                        <ButtonComponent type="terceary" link="/addJob" label="Nuevo" />
                    </article>
                    <p>
                        Actualmente tienes un plan gratuito, puede que no puedas
                        colocar visible 2 o más publicaciones.
                    </p>
                </aside>

                <aside>
                    <article className="rowPost row">
                        <aside className="title">
                            <p className="mb-2">Diseñador UX/UI</p>
                            <TagComponent
                                type="state"
                                level="success"
                                label="Publicado"
                            />
                        </aside>
                        <aside className="title">
                            <p>20 personas postularon</p>

                        </aside>
                        <aside className="actions">
                            <ButtonComponent type="secondary" label="Ver detalles" />
                        </aside>
                    </article>
                    <article className="rowPost row">
                        <aside className="title">
                            <p className="mb-2">Diseñador UX/UI</p>
                            <TagComponent
                                type="highlight"
                                level="gray"
                                label="Borrador"
                            />
                        </aside>
                        <aside className="title">
                            <p>Aún no visble, revisar planes.</p>

                        </aside>
                        <aside className="actions">
                            <ButtonComponent type="secondary" label="Ver detalles" />
                        </aside>
                    </article>
                    <article className="rowPost row">
                        <aside className="title">
                            <p className="mb-2">Diseñador UX/UI</p>
                            <TagComponent
                                type="highlight"
                                level="gray"
                                label="Borrador"
                            />
                        </aside>
                        <aside className="title">
                            <p>Aún no visble, revisar planes.</p>

                        </aside>
                        <aside className="actions">
                            <ButtonComponent type="secondary" label="Ver detalles" />
                        </aside>
                    </article>
                    <article className="rowPost row">
                        <aside className="title">
                            <p className="mb-2">Diseñador UX/UI</p>
                            <TagComponent
                                type="highlight"
                                level="gray"
                                label="Borrador"
                            />
                        </aside>
                        <aside className="title">
                            <p>Aún no visble, revisar planes.</p>

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