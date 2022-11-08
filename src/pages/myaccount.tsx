import React, { Fragment, useState } from 'react';
import './../sass/pages/_myAccount.scss';

import Header from '../components/shared/header';
import Footer from '../components/shared/footer';

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

export default function MyAccount() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { startLogout, startUpdateUser } = useAuth();
	const { id } = useParams();
	const [tabIndex, setTabIndex] = useState(+id);
	
	const handleLogout = () => {
		startLogout();
	};
	
	const [avatar, setAvatar] = useState(
		user.avatar,
	);
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
		console.log('user',user);
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
					facebookURL:postulant.facebookURL,
					linkedin:"",
					linkedinURL:"",
					web:"",
					webURL:postulant.webURL,
					youtube:"",
					youtubeURL:postulant.youtubeURL,
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
		console.log('lo q envio',dataSend);
		console.log('respuesta',respUpdate);
		
	};

	
	if ( user === undefined || user === null) return <Navigate to="/login" replace={true}/>;

	return (
		<React.Fragment>
			<Header />
			<section className="myAccountPage">
				<Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
					<TabList className={"mb-5"}>
						<aside className="sideBarMenu">
							<h3 className="mb-1">Mi Cuenta</h3>
							<span>Gestiona tu cuenta</span>
							<p className="mb-1 mt-1"><a onClick={handleLogout}>Cerrar Sesión</a></p>
						</aside>
						<div className="list">
							<Tab>Datos generales</Tab>
							<Tab> {user?.rol === COMPANY ? 'Mis publicaciones' : 'Mis postulaciones'}</Tab>
							<Tab>Proyectos</Tab>
						</div>
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
										<div>
											<img src={'https://api.chambea-ya.com/public/'+user.avatar} alt="" />
										</div>
									</aside>
									<aside className="FormGroup">
										<Txtfield onChange={handleEvent} value={company.email} name="email" placeholder="Correo electrónico" />
										<Txtfield onChange={handleEvent} value={company.phone} name="phone" placeholder="Teléfono" />
									</aside>

									<aside style={{display:'flex', justifyContent:'center'}}>
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
									<hr/>
									<p className='mt-3'>Redes Sociales</p>
									<aside className="FormGroupRS mt-2">
										<p>Instagram:</p>
										<Txtfield onChange={handleEventPostulant} value={postulant.instagramURL} name="instagramURL" placeholder="Perfil de Instagram" />
									</aside>
									<aside className="FormGroupRS mt-2">
										<p>Facebook:</p>
										<Txtfield onChange={handleEventPostulant} value={postulant.facebookURL} name="facebookURL" placeholder="Perfil de Facebook" />
									</aside>
									<aside className="FormGroupRS mt-2">
										<p>Youtube:</p>
										<Txtfield onChange={handleEventPostulant} value={postulant.youtubeURL} name="youtubeURL" placeholder="Canal de Youtube" />
									</aside>
									<aside className="FormGroupRS mt-2">
										<p>Web:</p>
										<Txtfield onChange={handleEventPostulant} value={postulant.webURL} name="webURL" placeholder="Web personal" />
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

									<aside style={{display:'flex', justifyContent:'center'}} >
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
