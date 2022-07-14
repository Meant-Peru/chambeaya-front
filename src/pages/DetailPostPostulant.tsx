import { useEffect, useState } from 'react';
import { TagComponent } from '../components/shared/atom/tag';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import './../sass/pages/_detailPostCompany.scss';
import Logo1 from './../assets/logos/1.svg';
import { BtnPrimary } from '../components/shared/styled';
import { useParams } from 'react-router-dom';
import { usePostCompany } from '../hooks/usePostCompany';
import { ListSkill, PostulantJob } from '../interfaces/DetailPost';
import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import { Skill } from '../interfaces/Skill';
import ButtonComponent from '../components/shared/atom/button';
import { DetailPostulant, UserDataPostulant } from '../interfaces/DetailPostulant';

export const DetailPostPostulant = () => {
	// detail-post-company
	const [loadingPost, setLoadingPost] = useState(false);
	const [postJob, setPostJob] = useState<DetailPostulant>();
	const [postulant, setPostulant] = useState<UserDataPostulant>();
	const [listSkill, setListSkill] = useState<ListSkill[]>([]);
	const { idP, idJob } = useParams();
	const { startDetailPostulant } = usePostCompany();

	useEffect(() => {
		handlerInit();
	}, [idP, idJob]);

	const handlerInit = async () => {
		// console.log({ idP, idJob });
		setLoadingPost(true);
		const resp = await startDetailPostulant({ idP, idJob });
		console.log({ resp });
		setPostJob(resp);
		setPostulant(resp.dataPostAndPostulant.userDataPostulant);
		console.log({ postulant });
		// console.log('resp?.postulants', resp?.postulants);
		// setListSkill([...resp.listSkills]);
		setLoadingPost(false);
	};

	return (
		<React.Fragment>
			<Backdrop
				open={loadingPost}
				style={{
					background: 'white',
					zIndex: 99,
				}}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Header />
			<section className="detailPostCompanyPage">
				<aside className="coverHeaderFlex mb-5">
					<article className="">
						<h1 className="mb-2">
							{postulant?.name} {postulant?.lastName}
						</h1>
						<p>
							<i> {postJob?.title} </i>
						</p>
					</article>
					<article className="actionApply">
						<BtnPrimary> Contratar perfil </BtnPrimary>
						<p className="mt-2">{postJob?.porcentageSkills}% de similitud al requerimiento</p>
					</article>
				</aside>
				<aside className="skillTags">
					<TagComponent type="state" level="success" tag={{ nameSkill: 'skills' }} />
					{/* {listSkill.map((s: ListSkill) => (
					))} */}
				</aside>
				<hr />

				<aside className="detailsApply mt-5 mb-5">
					<article className="leftBox">
						<div className="mb-5">
							<h4 className="mb-3">Descripción</h4>
							<p>dsadsadsa </p>
						</div>
						<hr />
						<div className="mt-5">
							<h4 className="mb-3">Documentos</h4>
							<p>{postulant?.documentType == '1' ? 'DNI' : 'Recibo por Honorarios'}</p>
							<p>{postulant?.documentNumber}</p>
						</div>
					</article>
					<article className="rightBox">
						<h4 className="mb-3">Precisiones</h4>

						<ul>
							<li>Presupuesto estimado: S/ {postJob?.salaryRange}</li>
						</ul>
					</article>
				</aside>

				<aside>
					<div>
						<h4 className="mb-3">Referencias de Experiencia</h4>
					</div>
					<ul>
						<li>Certijoven</li>
						<li>Linkedin</li>
						<li>CV</li>
					</ul>
				</aside>
			</section>
			<Footer />
		</React.Fragment>
	);
};
