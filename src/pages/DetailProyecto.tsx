import React, { Fragment, useEffect, useState } from 'react';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import './../sass/pages/_detailProject.scss';
import time from './../assets/time.svg';

import yape from './../assets/yape.png';
import plin from './../assets/plin.png';
import ButtonComponent from '../components/shared/atom/button';
import { Backdrop, CircularProgress } from '@material-ui/core';

import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { getDetailProjectsId, uploadProjectReceipt } from '../util/company.service';
import { DetailProjectInteface } from '../interfaces/DetailProjectInteface';
import { ModalComponent } from '../components/ModalComponent';
import { useUi } from '../hooks/useUi';
import { DropzoneDialog } from 'material-ui-dropzone';
import toast, { Toaster } from 'react-hot-toast';
import { URI } from '../enviroment/enviroment';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export const DetailProyecto = () => {
	const [dropzone, setDropzone] = useState(false);
	const [modalIsOpen2, setModalIsOpen2] = useState(false);
	const [loadingDetailProject, setLoadingDetailProject] = useState(false);
	const [detailProject, setDetailProject] = useState<DetailProjectInteface>();
	const { idProject } = useParams();
	const { changeStateModal } = useUi();

	useEffect(() => {
		getProjectsId();
	}, []);

	const getProjectsId = async () => {
		setLoadingDetailProject(true);
		const resp = await getDetailProjectsId({ id: idProject });
		console.log('detailproject',resp);
		setDetailProject({ ...resp });
		setLoadingDetailProject(false);
	};

	const openModal = () => changeStateModal(true);

	const closeModal = () => changeStateModal(false);

	const handlerUploadReceipt = async (files: File[]) => {
		setLoadingDetailProject(true);
		const formData = new FormData();
		formData.append('id', idProject);
		formData.append('image', files[0]);
		setDropzone(false);
		const status = await uploadProjectReceipt(formData);
		setLoadingDetailProject(false);
		if (status) {
			toast.success('Se cargo el comprobante correctamente');
		} else {
			toast.error('Error en subir el comprobante!');
		}
	};

	return (
		<React.Fragment>
			<Backdrop
				open={loadingDetailProject}
				style={{
					background: 'white',
					zIndex: 99,
				}}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Header />
			<Toaster position="top-right" reverseOrder={false} />
			<section className="detailProject">
				<p>Detalle de Proyecto</p>
				<br />
				<h2 className="accent-color">{detailProject?.projectTitle}</h2>
				<hr />
				<aside className="mt-5">
					
					<h4>Perfil contratado</h4>
					<p>El perfil fue elegido por afinidad a su requerimiento y validado para el desarrollo de su proyecto</p>
			
					
					
				</aside>
				<aside className="cardPostulant mt-3">
					<div className='cont1'>
					<strong className="mb-1">
						{detailProject?.postulant.dataUser.name} {detailProject?.postulant.dataUser.lastName}
					</strong>
					<i>{detailProject?.projectTitle}</i>
					</div>
					<div>
					<ButtonComponent family="primary" link={`/detail-postulant/${detailProject?.idPostulant}`} label="Ver" />
					</div>
					
				</aside>
				<aside className="mt-3">
					<h4 className="mb-2">Pagos y comprobantes</h4>
					<article className="mmlist mb-1">
						<div>
							<img src={time} width="20" alt="" />
							<span>Comprobantes de pago</span>
						</div>
						{detailProject?.dataContract.proofPayment ? (
							<a href={`${URI}/images/${detailProject?.dataContract.proofPayment}`} className={'btnComponent--terceary'} target="_blank">
								Ver documentos
							</a>
						) : (
							<ButtonComponent link={'/'} family="terceary" icon="whitOutIcon" label="Ver documentos" />
						)}
					</article>

					<h4 className="mt-5">Presupuesto de proyecto</h4>
					<p>Se requiere el pago del proyecto para iniciar kick-off</p>
					<article>
						<div className="headerTab mt-3">Modo de pagos</div>
						<div className="row mpago">
							<span className="row mlist">
								Pago por Yape o Plin{' '}
								<button className="btnComponent--textLink" onClick={openModal}>
									Ver datos
								</button>
							</span>
							<ButtonComponent onPress={() => setDropzone(true)} type="Dropzone" family="terceary" icon="whitIcon" label="Subir comprobante" />
						</div>
						<div className="row mpago">
							<span className="row mlist">
								Transferencia Bancaria{' '}
								<button className="btnComponent--textLink" onClick={() => setModalIsOpen2(true)}>
									Ver datos
								</button>
							</span>
							<ButtonComponent onPress={() => setDropzone(true)} type="Dropzone" family="terceary" icon="whitIcon" label="Subir comprobante" />
						</div>
					</article>

					<h4 className="mt-5">Proyecto en curso</h4>
					<p>Se ha establecido un cronograma de trabajo para constatar el estatus del proyecto.</p>
					<article className="mt-4">
						<ButtonComponent link={'/'} family="secondary" icon="whitOutIcon" label="CRONOGRAMA DE TRABAJO" />
					</article>

					<ModalComponent indentifier={1}>
						<section className="containerModal">
							<aside className="headModal">
								<h2>Pagar con monederos</h2>
							</aside>
							<aside className="contentModal">
								<p>Recuerde que puede hacer pagos en 1 o más transacciones</p>
								<strong>Titular: Chambea Ya S.A.C</strong>
								<article className="mt-4">
									<img src={yape} alt="" />
									<img src={plin} alt="" />
								</article>
							</aside>
							<button className="btnComponent--primary" onClick={closeModal}>
								Listo
							</button>
						</section>
					</ModalComponent>
					<Modal isOpen={modalIsOpen2} style={customStyles} ariaHideApp={false} overlayClassName="Overlay">
						<section className="containerModal">
							<aside className="headModal">
								<h2>Transferencia Bancaria</h2>
							</aside>
							<aside className="contentModal">
								<p>Recuerde que puede hacer pagos en 1 o más transacciones</p>
								<strong>Titular: Chambea Ya S.A.C</strong>
								<article className="col mt-4 mb-2">
									<ul>
										<li>BCP: 192-232323-2321</li>
										<li>BBVA: 34-24323231</li>
										<li>INTERBANK: 92-24323231</li>
									</ul>
								</article>
							</aside>
							<button className="btnComponent--primary" onClick={() => setModalIsOpen2(false)}>
								Listo
							</button>
						</section>
					</Modal>
					<DropzoneDialog
						open={dropzone}
						onSave={(files: File[]) => handlerUploadReceipt(files)}
						acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
						showPreviews={true}
						maxFileSize={5000000}
						onClose={() => setDropzone(false)}
						dialogTitle="Subir comprobantes de pago"
						dropzoneText="Arrastre y suelte su comprobante aquí o haga click"
						cancelButtonText="Cancelar"
						submitButtonText="Subir"
					/>
				</aside>
			</section>
			<Footer />
		</React.Fragment>
	);
};
