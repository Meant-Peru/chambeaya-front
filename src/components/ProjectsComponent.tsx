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
			<aside className="listCards">
				{projects.map((p: Project) => (
					<article className="cardHistory" key={p._id}>
						<div className="headCard">
							<strong>{p.title}</strong>
							<span>
								<i>{p.state ? 'Proyecto iniciado' : 'Proyecto no iniciado'}</i>
							</span>
						</div>
						<div className="contentCard">
							<ul className="listCard">
								<li>
									<img src={check} alt="" /> <span>Contratado</span>
								</li>
								<li>
									<img src={negative} alt="" /> <span>Presupuesto no depositado</span>
								</li>
								<li>
									<img src={check} alt="" /> <span>Documentación completa</span>
								</li>
							</ul>
							<ButtonComponent link={'/detail-project'} family="textLink" icon="whitOutIcon" label="Ver Detalle" />
						</div>
					</article>
				))}
			</aside>
		</>
	);
};
