import React, { Fragment, useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Header from '../components/shared/header';
import ilusEmpty from './../assets/empty-state.svg';
import { Txtfield, TxtArea, DropdownMenu, DropdownItem, BtnPrimary } from '../components/shared/styled';
import './../sass/pages/_myAccount.scss';
import Footer from '../components/shared/footer';

import { COMPANY, POSTULANT } from '../helpers/constants';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';

import { PostCompany } from '../components/PostCompany';
import { MyApply } from '../components/MyApply';
import { usePostulant } from '../hooks/usePostulant';

export default function MyAccount() {
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
							<a onClick={handleLogout}>Cerrar Sesión</a>
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
										<TxtArea onChange={handleEvent} value={company.description} name="description" placeholder="Descripción" />
									</aside>
									<aside className="FormGroup mt-2 mb-5">
										<Txtfield onChange={handleEvent} value={company.email} name="email" placeholder="Correo electrónico" />
										<Txtfield onChange={handleEvent} value={company.phone} name="phone" placeholder="Teléfono" />
									</aside>

									<aside>
										{/* <ButtonComponent type="primary" label="Actualizar" /> */}
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
										<Txtfield onChange={handleEventPostulant} value={postulant.email} name="email" placeholder="Correo electrónico" />
										<Txtfield onChange={handleEventPostulant} value={postulant.phone} name="phone" placeholder="Teléfono" />
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
											<DropdownItem>Banco de Crédito del Perú</DropdownItem>
											<DropdownItem>BBVA</DropdownItem>
										</DropdownMenu>
										<Txtfield placeholder="Nro de cuenta" />
									</aside>

									<aside>
										{/* <ButtonComponent  type="primary" label="Actualizar" /> */}
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
							<img src={ilusEmpty} alt="empty" />
							<p>Aún no ingresaste a algún proyecto</p>
						</section>
					</TabPanel>
				</Tabs>
			</section>
			<Footer />
		</React.Fragment>
	);
}
