import * as React from 'react';
import './../sass/pages/_detailPost.scss';

import Header from '../components/shared/header';
import { TagComponent } from '../components/shared/atom/tag';
import CardPost from '../components/shared/cardPost';

import Logo1 from './../assets/logos/1.svg';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Txtfield, DropdownMenu, DropdownItem, BtnPrimary, BtnSecondary} from './../components/shared/styled';

import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/shared/footer';
import { usePostForm, usePostJob } from '../hooks/usePostJob';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { get, split } from 'lodash';
import { PostJob } from '../types/post_job';
import { postulateJob } from '../util/job.service';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
	}
};

export default function ListPost() {
	const { form, handleForm, reset } = usePostForm();
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	const {
		postJobSate: { loading, postJob },
	} = usePostJob(id);
	const _postJob = postJob!.reduce((k: any, o: any) => ((k[o] = k), o), {}) as PostJob;
	console.log({ _postJob });

/*	const handleRedirect = () => {
		navigate('/apply/' + id);
	}; */

	form.idPostJob = id;

	const submit = async (event: any) => {
		event.preventDefault();
		await postulateJob(form);
		toast.success('Te has postulado correctamente, gracias!');
		reset();
		setTimeout(() => {
			navigate('/');
		}, 2000);
	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//   subtitle.style.color = '#f00';
	}

	function aplicar() {
		// references are now sync'd and can be accessed.
		//   subtitle.style.color = '#f00';
	}

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
			<Toaster position="top-right" reverseOrder={false} />
			{!loading && (
				<section className="DetailPostComponent">
					<aside className="coverHeader mb-5">
						<h1 className="mb-2">{get(_postJob, 'title', '')}</h1>
						<p>
							<i>{get(_postJob.dataCompany, 'businessName', '')}</i>
						</p>
					</aside>
					<aside className="skillTags">
						{get(_postJob, 'listSkills', []).map((value) => (
							<TagComponent type="highlight" key={Math.random()} level="secondary" tag={value} />
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
							<BtnPrimary onClick={openModal}> Aplicar </BtnPrimary>
							<p className="mt-2">Requerimiento activo</p>
						</article>
					</aside>

					<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
									<h2 className="text-center">Aplicar a {get(_postJob, 'title', '')}</h2>
									<p className="mt-2 text-center">
										<i>Antes de aplicar ingresa tus pretenciones salariales</i>
									</p>
									<aside className="FormGroup">
									<form onSubmit={submit}>
									<DropdownMenu onChange={handleForm} name="typeAmount" value={form.typeAmount}>
												<DropdownItem>Eliga tipo de moneda</DropdownItem>
												<DropdownItem value="1">Soles</DropdownItem>
												<DropdownItem value="2">Dólares</DropdownItem>
									</DropdownMenu>
									<Txtfield className="ml-5" placeholder="Pretención salarial" onChange={handleForm} name="amountEstimated" value={form.amountEstimated} />
									<BtnSecondary onClick={closeModal}>CANCELAR</BtnSecondary>
									<BtnPrimary type="submit"> APLICAR AHORA </BtnPrimary>
									</form>
									</aside>
									<p className="mt-2 text-center">
											<i>* Recuerde que el presupuesto estimado por el cliente es de : {get(_postJob, 'salaryRange', '')} soles</i>
										</p>
					</Modal>

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
