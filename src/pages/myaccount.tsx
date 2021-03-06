import React, { Fragment, useEffect, useState } from 'react';
import './../sass/pages/_myAccount.scss';

import Header from '../components/shared/header';
import Footer from '../components/shared/footer';
import check from './../assets/check.svg';
import negative from './../assets/negative.svg';
import ilusEmpty from "./../assets/empty-state.svg"

import Modal from 'react-modal';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Txtfield, TxtArea, DropdownMenu, DropdownItem, BtnPrimary } from '../components/shared/styled';

import { COMPANY, POSTULANT } from '../helpers/constants';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';

import { PostCompany } from '../components/PostCompany';
import { MyApply } from '../components/MyApply';


import ButtonComponent from '../components/shared/atom/button';

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

export default function MyAccount() {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//   subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}



	const { user } = useSelector((state: RootState) => state.auth);
	const { startLogout, startUpdateUser } = useAuth();

	const [postulant, setPostulant] = useState({
		...user.dataUser,
	});

	const [company, setCompany] = useState({
		...user.dataUser,
	});

	const handleEvent = (e: any) => {
		setCompany({
			...company,
			[e.target.name]: e.target.value,
		});
	};

	const handleEventPostulant = (e: any) => {
		setPostulant({
			...postulant,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdate = async () => {
		let dataSend;
		if (user.rol === POSTULANT) {
			dataSend = { ...user, dataUser: { ...postulant } };
		} else {
			dataSend = { ...user, dataUser: { ...company } };
		}

		const respUpdate = await startUpdateUser(dataSend);
		console.log({ respUpdate });
	};

	const handleLogout = () => {
		startLogout();
	};

	if (Object.keys(user.dataUser).length === 0) return <Navigate replace to="/login" />;

	return (
		<React.Fragment>
			<Header />
			<section className="myAccountPage">
				<Tabs>
					<TabList className={'mb-5'}>
						<aside className="sideBarMenu mb-5">
							<h3 className="mb-2">Mi Cuenta</h3>
							<span>Gestiona tu cuenta</span>
						</aside>
						<div className="list">
							<Tab>Datos generales</Tab>
							<Tab> {user?.rol === COMPANY ? 'Mis publicaciones' : 'Mis postulaciones'}</Tab>
							<Tab>Proyectos</Tab>
						</div>
						<aside className="sideBarMenu mt-5 mb-5">
							<a onClick={handleLogout}>Cerrar Sesi??n</a>
						</aside>
					</TabList>

					<TabPanel>
						<section className="sectionAccount">
							{user?.rol === COMPANY ? (
								<Fragment>
									<p>Datos primarios</p>
									<aside className="FormGroup mt-3">
										<Txtfield onChange={handleEvent} value={company.businessName} name="businessName" placeholder="Nombre de empresa" />
										<Txtfield onChange={handleEvent} value={company.ruc} name="ruc" placeholder="Nro de Documento" />
									</aside>
									<aside className="FormGroup mt-4 mb-4">
										<TxtArea onChange={handleEvent} value={company.description} name="description" placeholder="Descripci??n" />
									</aside>
									<aside className="FormGroup mt-2 mb-5">
										<Txtfield onChange={handleEvent} value={company.email} name="email" placeholder="Correo electr??nico" />
										<Txtfield onChange={handleEvent} value={company.phone} name="phone" placeholder="Tel??fono" />
									</aside>

									<aside>
										{/* <ButtonComponent family="primary" label="Actualizar" /> */}
										<BtnPrimary onClick={handleUpdate}>Actualizar</BtnPrimary>
									</aside>
								</Fragment>
							) : (
								<Fragment>
									<p>Datos personales</p>
									<aside className="FormGroup mt-3">
										<Txtfield onChange={handleEventPostulant} value={postulant.name} name="name" placeholder="Nombres" />
										<Txtfield onChange={handleEventPostulant} value={postulant.lastName} name="lastName" placeholder="Apellidos" />
									</aside>
									<aside className="FormGroup mt-2 mb-5">
										<Txtfield onChange={handleEventPostulant} value={postulant.email} name="email" placeholder="Correo electr??nico" />
										<Txtfield onChange={handleEventPostulant} value={postulant.phone} name="phone" placeholder="Tel??fono" />
									</aside>
									<p>Datos de Pago</p>
									<aside className="FormGroup mt-3">
										<DropdownMenu>
											<DropdownItem>Tipo de comprobante</DropdownItem>
											<DropdownItem>Recibo por Honorarios</DropdownItem>
											<DropdownItem>Factura</DropdownItem>
											<DropdownItem>Recibo</DropdownItem>
										</DropdownMenu>
										<Txtfield placeholder="Nro de comprobante" />
									</aside>
									<aside className="FormGroup mt-2 mb-5">
										<DropdownMenu>
											<DropdownItem>Banco de destino</DropdownItem>
											<DropdownItem>Banco de Cr??dito del Per??</DropdownItem>
											<DropdownItem>BBVA</DropdownItem>
										</DropdownMenu>
										<Txtfield placeholder="Nro de cuenta" />
									</aside>

									<aside>
										{/* <ButtonComponent  family="primary" label="Actualizar" /> */}
										<BtnPrimary onClick={handleUpdate}>Actualizar</BtnPrimary>
									</aside>
								</Fragment>
							)}
						</section>
					</TabPanel>
					<TabPanel>
						{/* <section className="apply">
							<img src={ilusEmpty} alt="empty" />
							<p>No se encontraron postulaciones</p>

						</section> */}

						{user?.rol === COMPANY ? <PostCompany /> : <MyApply />}
					</TabPanel>
					<TabPanel>
						<section className="proyects">
							
							{user?.rol === COMPANY ? <>
								<h2>Listado de proyectos</h2>
								<aside className="listCards">
									<article className="cardHistory">
										<div className="headCard">
											<strong>Senior Product Designer</strong>
											<span><i>Proyecto no iniciado</i></span>
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
													<img src={check} alt="" /> <span>Documentaci??n completa</span>
												</li>
											</ul>
											{/* <button className="btnComponent--textLink" onClick={openModal}></button> */}

											<ButtonComponent
												link={"/detail-project"}
												family="textLink"
												icon='whitOutIcon'
												label="Ver Detalle"
											/>

											<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
												<button onClick={closeModal}>close</button>

												<h2>Soy un modal</h2>
											</Modal>
										</div>
									</article>

								</aside>
							</> : <>
								<img src={ilusEmpty} alt="empty" />
								<p>A??n no ingresaste a alg??n proyecto</p>
							</>}


						</section>
					</TabPanel>
				</Tabs>
			</section>
			<Footer />
		</React.Fragment>
	);
}
