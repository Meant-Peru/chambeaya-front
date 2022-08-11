// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { usePostCompany } from '../hooks/usePostCompany';
import { PostJob } from '../types/post_job';
import ButtonComponent from './shared/atom/button';
import { TagComponent } from './shared/atom/tag';
import './../sass/pages/_postJob.scss';

export const PostCompany = () => {
	const { getPosts } = usePostCompany();
	const [listPost, setListPost] = useState<PostJob[]>([]);

	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		const data = await getPosts();
		// console.log({ data });
		setListPost([...data]);
	};

	return (
		<React.Fragment>
			<section className="sectionAccount">
				<article className="headSection">
					<h2>Publicaciones</h2>
					<ButtonComponent family="terceary" link="/addJob" label="Nuevo" />
				</article>
				<p className="mb-5">Actualmente tienes un plan gratuito, puede que no puedas colocar visible 2 o más publicaciones.</p>

				<aside>
					{listPost.map((p: PostJob) => (
						<article className="rowPost row" key={p._id}>
							<aside className="title">
								<p className="mb-2">{p.title}</p>
								<TagComponent type="state" level="success" label="Publicado" /* clearTag="clearTagHide" */ tag={{ nameSkill: 'Publicado' }} />
							</aside>
							<aside className="title">
								<p>{p.postulants} personas postularon</p>
							</aside>
							<aside className="actions">
								<ButtonComponent family="secondary" link={'/detail-post-company/' + p._id} label="Ver detalles" />
							</aside>
						</article>
					))}
					{/* <article className="rowPost row">
						<aside className="title">
							<p className="mb-2">Diseñador UX/UI</p>
							<TagComponent family="highlight" level="gray" label="Borrador" clearTag="clearTagHide" />
						</aside>
						<aside className="title">
							<p>Aún no visble, revisar planes.</p>
						</aside>
						<aside className="actions">
							<ButtonComponent family="secondary" label="Ver detalles" />
						</aside>
					</article>
					<article className="rowPost row">
						<aside className="title">
							<p className="mb-2">Diseñador UX/UI</p>
							<TagComponent family="highlight" level="gray" label="Borrador" clearTag="clearTagHide" />
						</aside>
						<aside className="title">
							<p>Aún no visble, revisar planes.</p>
						</aside>
						<aside className="actions">
							<ButtonComponent family="secondary" label="Ver detalles" />
						</aside>
					</article>
					<article className="rowPost row">
						<aside className="title">
							<p className="mb-2">Diseñador UX/UI</p>
							<TagComponent family="highlight" level="gray" label="Borrador" clearTag="clearTagHide" />
						</aside>
						<aside className="title">
							<p>Aún no visble, revisar planes.</p>
						</aside>
						<aside className="actions">
							<ButtonComponent family="secondary" label="Ver detalles" />
						</aside>
					</article> */}
				</aside>
			</section>
		</React.Fragment>
	);
};
