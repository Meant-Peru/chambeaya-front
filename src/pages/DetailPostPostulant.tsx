import { useEffect, useState } from 'react';
import { TagComponent } from '../components/shared/atom/tag';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import './../sass/pages/_detailPostCompany.scss';
import { BtnPrimary, BtnSecondary } from '../components/shared/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostCompany } from '../hooks/usePostCompany';
import { ListSkill } from '../interfaces/DetailPost';
import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import { DetailPostulant, UserDataPostulant } from '../interfaces/DetailPostulant';
import { ModalComponent } from '../components/ModalComponent';
import { useUi } from '../hooks/useUi';
import toast, { Toaster } from 'react-hot-toast';

export const DetailPostPostulant = () => {
	// detail-post-company
	const [loadingPost, setLoadingPost] = useState(false);
	const navigate = useNavigate();
	const [postJob, setPostJob] = useState<DetailPostulant>();
	const [postulant, setPostulant] = useState<UserDataPostulant>();
	const [listSkill, setListSkill] = useState<ListSkill[]>([]);
	const { idP, idJob } = useParams();
	const { startDetailPostulant, startCreatePostJobContracts } = usePostCompany();
	const { changeStateModal } = useUi();

	useEffect(() => {
		handlerInit();
	}, [idP, idJob]);

	const handlerInit = async () => {
		// console.log({ idP, idJob });
		setLoadingPost(true);
		const resp: DetailPostulant = await startDetailPostulant({ idP, idJob });
		console.log('start detail postulant job',{ resp });
		setPostJob(resp);
		setPostulant(resp.dataPostAndPostulant.userDataPostulant);
		console.log({ postulant });
		// console.log('resp?.postulants', resp?.postulants);
		// setListSkill([...resp.listSkills]);
		setLoadingPost(false);
	};

	const handlerContractor = async () => {
		if (!postJob.state) return;
		const dataSend = {
			projectTitle: postJob.title,
			idPostulant: postJob.dataPostAndPostulant.idPostulant,
			idPostJob: postJob.dataPostAndPostulant.idPostJob,
			idPostulation: postJob.dataPostAndPostulant._id,
			idCompany: postJob.idCompany,
			dataContract: {
				typePayment: '',
				proofPayment: '',
				paymentAmount: '',
				proofDate: new Date(),
				states: {
					initProject: false,
					paidProject: false,
					fullDocumentation: false,
					stateProject: true,
				},
			},
		};
		const status = await startCreatePostJobContracts(dataSend);
		changeStateModal(false);
		if (status) {
			toast.success('Se contrato al postulante!');
			setTimeout(() => {
				navigate('/myaccount/0');
			}, 2000);
		} else {
			toast.error('Error en registrar al postulante!');
		}
	};

	const openModal = () => changeStateModal(true);

	const closeModal = () => changeStateModal(false);

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
			<Toaster position="top-right" reverseOrder={false} />
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
						<BtnPrimary onClick={openModal} disabled={!postJob?.state}>
							Contratar perfil
						</BtnPrimary>
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
			<ModalComponent>
				<aside className="mt-2 mr-5 ml-5 mb-2">
					<h2 className="text-center">Contrato del postulante</h2>
					<p className="mt-2 text-center">
						<i>Nuestra plataforma detecto {postJob?.porcentageSkills}% de similitud del postulante con su requerimiento.</i>
					</p>
					<aside className="FormGroup algn-center mt-2">
						<br />
						<br />
						<BtnSecondary className="mr-2" onClick={closeModal}>
							CANCELAR
						</BtnSecondary>
						<BtnPrimary type="submit" onClick={handlerContractor}>
							SI, CONFIRMAR
						</BtnPrimary>
					</aside>
				</aside>
			</ModalComponent>
			<Footer />
		</React.Fragment>
	);
};
