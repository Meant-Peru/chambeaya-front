import * as React from 'react';
import './../sass/pages/_detailPost.scss';

import Header from '../components/shared/header';
import { TagComponent } from '../components/shared/atom/tag';
import CardPost from '../components/shared/cardPost';

import Logo1 from './../assets/logos/1.svg';

import { useNavigate, useParams } from 'react-router-dom';
import { BtnPrimary } from '../components/shared/styled';
import Footer from '../components/shared/footer';
import { usePostJob } from '../hooks/usePostJob';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { get, split } from 'lodash';
import { PostJob } from '../types/post_job';

export default function ListPost() {
	const navigate = useNavigate();
	const { id } = useParams();
	const {
		postJobSate: { loading, postJob },
	} = usePostJob(id);
	const _postJob = postJob!.reduce((k: any, o: any) => ((k[o] = k), o), {}) as PostJob;
	console.log({ _postJob });

	const handleRedirect = () => {
		navigate('/apply/' + id);
	};

	return (
		<React.Fragment>
			<Header />
			<Backdrop
				open={loading!}
				style={{
					background: 'white',
					zIndex: 99,
				}}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{!loading && (
				<section className="DetailPostComponent">
					<aside className="coverHeader mb-5">
						<h1 className="mb-2">{get(_postJob, 'title', '')}</h1>
						<p>
							<i>{get(_postJob.dataCompany, 'businessName', '')}</i>
						</p>
					</aside>
					<aside className="skillTags">
						{get(_postJob, 'idsSkillsPostJob', []).map((value) => (
							<TagComponent type="highlight" key={Math.random()} level="secondary" label={value} clearTag="clearTagHide" />
						))}
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
							<BtnPrimary onClick={handleRedirect}> Aplicar </BtnPrimary>
							<p className="mt-2">Requerimiento activo</p>
						</article>
					</aside>
					<aside className="detailsApply mt-5 mb-5">
						<article className="leftBox">
							<div className="mb-5">
								<h4 className="mb-3">Descripción</h4>
								<p>{get(_postJob, 'descriptionPost', '')}</p>
							</div>
							<hr />
							<div className="mt-5">
								<h4 className="mb-3">Funciones</h4>
								{split(get(_postJob, 'funtionsPost', ''), ',').map((value) => (
									<p key={Math.random()}>* {value}</p>
								))}
							</div>
						</article>
						<article className="rightBox">
							<h4 className="mb-3">Precisiones</h4>

							<ul>
								<li>Duración: {get(_postJob, 'timeEstimated', '')}</li>
								<li>Presupuesto estimado: S/ {get(_postJob, 'salaryRange', '')}</li>
								<li>Tipo: {get(_postJob, 'modality', '')}</li>
							</ul>
						</article>
					</aside>

					<aside className="postRelated mt-5">
						<h2 className="mb-5">Publicaciones Similares</h2>
						<CardPost />
					</aside>
				</section>
			)}
			<Footer />
		</React.Fragment>
	);
}
