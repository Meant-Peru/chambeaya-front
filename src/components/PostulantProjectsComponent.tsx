import React, { useEffect, useState } from 'react';
import { Project } from '../interfaces/Project';
import { getPostulantProjectsAllId } from '../util/postulant.service';
import check from './../assets/check.svg';
import negative from './../assets/negative.svg';
import ButtonComponent from './shared/atom/button';

export const PostulantProjectsComponent = () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);

    const getProjectsId = async () => {
        setLoading(true)
        const resp = await getPostulantProjectsAllId();
        console.log(resp);
        setProjects(resp.listProjects);
        setLoading(false)
    };

    useEffect(() => {
        getProjectsId();
    }, []);

    if (loading) {
        return <div>Consultando tus proyectos...</div>
    }

    return (
        <>
            <h2>Listado de proyectos</h2>
            <aside className="listCards">

                {projects.length === 0 &&
                    <div>
                        <p>No tienes proyectos</p>
                    </div>
                }

                {projects.length > 0 &&
                    <div className='gridSales'>
                        {projects.map((p: Project) => (
                            <article className="card" key={p._id}>
                                <div className="headCard">
                                    <strong>{p.projectTitle}</strong>
                                    <span>
                                        <i>{p?.dataContract.states.initProject ? 'Proyecto iniciado' : 'Proyecto no iniciado'}</i>
                                    </span>
                                </div>
                                <div className="contentCard">
                                    <ul className="listCard">
                                        <li>
                                            <img src={p?.dataContract.states.stateProject ? check : negative} alt="" /> <span>Perfil Contratado</span>
                                        </li>

                                        <li>
                                            <img src={p?.dataContract.states.fullDocumentation ? check : negative} alt="" /> <span>Documentación completa</span>
                                        </li>
                                    </ul>
                                    <ButtonComponent link={`/detail-project-post/${p._id}`} family="textLink" icon="whitOutIcon" label="Ver Cronograma" />
                                </div>
                            </article>
                        ))}
                    </div>
                }
            </aside>
        </>
    );
};
