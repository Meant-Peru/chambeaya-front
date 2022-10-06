import React, { Fragment, useState } from 'react';
import './../sass/pages/_myAccount.scss';

import Header from '../components/shared/header';
import Footer from '../components/shared/footer';
import ilusEmpty from './../assets/empty-state.svg';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Txtfield, TxtArea, DropdownMenu, DropdownItem, BtnPrimary } from '../components/shared/styled';

import { COMPANY, POSTULANT } from '../helpers/constants';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';

import { PostCompany } from '../components/PostCompany';
import { MyApply } from '../components/MyApply';

import { ProjectsComponent } from '../components/ProjectsComponent';
import {PostulantProjectsComponent} from '../components/PostulantProjectsComponent';
import { Business } from '@material-ui/icons';

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
	const { user } = useSelector((state: RootState) => state.auth);
	const { startLogout, startUpdateUser } = useAuth();
	const { id } = useParams();
	const [tabIndex, setTabIndex] = useState(+id);

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
	const handleLogout = () => {
		startLogout();
	};
	

	const [postulant, setPostulant] = useState({
		...user.dataUser,
	});
	const handleEventPostulant = (e: any) => {
		setPostulant({
			...postulant,
			[e.target.name]: e.target.value,
		});
	};

	const [company, setCompany] = useState({
		...user.dataUser,
	});
	const handleEvent = (e: any) => {
		setCompany({
			...company,
			[e.target.name]: e.target.value,
		});
	};

	

	const handleUpdate = async () => {
		let dataSend;
		if (user.rol === POSTULANT) {
			dataSend = { 
				dataUser: { 
					name:postulant.name,
					lastName:postulant.lastName,
					email: postulant.email,
					facebook:"",
					facebookURL:"",
					linkedin:"",
					linkedinURL:"",
					web:"",
					webURL:"",
					youtube:"",
					youtubeURL:"",
					phone:postulant.phone,
					rol:postulant.rol,
					ruc:""
					 },
					 rol:postulant.rol
					 };
		} else {
			dataSend = { 
				dataUser: { 
					rol:company.rol,
					businessName:company.businessName,
					description:company.description,
					email:company.email,
					facebook:"",
					facebookURL:"",
					linkedin:"",
					linkedinURL:"",
					web:"",
					webURL:"",
					youtube:"",
					youtubeURL:"",
					phone:company.phone,
					ruc:company.ruc
				 },
				 rol:company.rol,
				};
		}
		
		const respUpdate = await startUpdateUser(dataSend);
		console.log({ respUpdate });
		
	};

	
	if (Object.keys(user.dataUser).length === 0) return <Navigate replace to="/login" />;

	return (
		<React.Fragment>
			<Header />
			<section className="myAccountPage">
				<Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
					<TabList className={'listTab'}>
						<aside className="sideBarMenu">
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
									<aside className="FormGroup">
										<Txtfield onChange={handleEvent} value={company.businessName} name="businessName" placeholder="Nombre de empresa" />
										<Txtfield onChange={handleEvent} value={company.ruc} name="ruc" placeholder="Nro de Documento" />
									</aside>
									<aside className="FormGroup">
										<TxtArea onChange={handleEvent} value={company.description} name="description" placeholder="Descripción" />
									</aside>
									<aside className="FormGroup">
										<Txtfield onChange={handleEvent} value={company.email} name="email" placeholder="Correo electrónico" />
										<Txtfield onChange={handleEvent} value={company.phone} name="phone" placeholder="Teléfono" />
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
										{/* <ButtonComponent  family="primary" label="Actualizar" /> */}
										<BtnPrimary onClick={handleUpdate}>Actualizar</BtnPrimary>
									</aside>
								</Fragment>
							)}
						</section>
					</TabPanel>
					<TabPanel>
						{user?.rol === COMPANY ? <PostCompany /> : <MyApply />}
					</TabPanel>
					<TabPanel>
						<section className="proyects">
							{user?.rol === COMPANY ? (
								<ProjectsComponent />
							) : (
								<PostulantProjectsComponent />
								
							)}
						</section>
					</TabPanel>
				</Tabs>
			</section>
			<Footer />
		</React.Fragment>
	);
}
