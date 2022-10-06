import React, { useEffect, useState } from 'react';
import { Project } from '../interfaces/Project';
import { getProjectsAllId } from '../util/company.service';
import check from './../assets/check.svg';
import negative from './../assets/negative.svg';
import ButtonComponent from './shared/atom/button';

export const ProjectsComponent = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		getProjectsId();
	}, []);

	const getProjectsId = async () => {
		const resp = await getProjectsAllId();
		setProjects(resp.listProjects);
	};

	return (
		<>
			<h2>Listado de proyectos</h2>
			<aside className="gridSales">
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
							<ButtonComponent link={`/detail-project/${p._id}`} family="textLink" icon="whitOutIcon" label="Ver Cronograma" />
						</div>
					</article>
				))}
			</aside>
		</>
	);
};
