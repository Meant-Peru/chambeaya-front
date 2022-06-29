import React, { Fragment, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Header from '../components/shared/header';
import { Txtfield, BtnPrimary } from '../components/shared/styled';
import './../sass/pages/_myAccount.scss';
import './../sass/pages/_dashboard.scss';
import Footer from '../components/shared/footer';

import { POSTULANT } from '../helpers/constants';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
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
							<h3 className="mb-2">Admin</h3>
							<span>Cuenta de administrador</span>
						</aside>
						<div className="list">
							<Tab>Datos generales</Tab>
							<Tab>Usuarios</Tab>
							<Tab>Publicaciones</Tab>
						</div>
						<aside className="sideBarMenu mt-5 mb-5">
							<a onClick={handleLogout}>Cerrar Sesión</a>
						</aside>
					</TabList>

					<TabPanel>
						<section className="sectionAccount">

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

								<aside>
									{/* <ButtonComponent  type="primary" label="Actualizar" /> */}
									<BtnPrimary onClick={handleUpdate}>Actualizar</BtnPrimary>
								</aside>
							</Fragment>

						</section>
					</TabPanel>
					<TabPanel>
						<section className="usersTable">
							{/* <img src={ilusEmpty} alt="empty" />
							<p>No se encontraron postulaciones</p> */}
							<h2>Usuarios</h2>
							<div className="tableUsers">
								<article className='headerRow'>
									<aside className='headerItem'>
										Nombres
									</aside>
									<aside className='headerItem'>
										Correo
									</aside>
									<aside className='headerItem'>
										Rol
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Csti Corp
									</aside>
									<aside className='contentItem'>
										csti@gmail.com
									</aside>
									<aside className='contentItem'>
										Empresa
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Stefanie
									</aside>
									<aside className='contentItem'>
									Stefanie@gmail.com
									</aside>
									<aside className='contentItem'>
										Postulante
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Alicia
									</aside>
									<aside className='contentItem'>
										alicia@gmail.com
									</aside>
									<aside className='contentItem'>
										Postulante
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Neil
									</aside>
									<aside className='contentItem'>
										nmancilla@gmail.com
									</aside>
									<aside className='contentItem'>
										Asesor / Vendedor
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Meant SAC
									</aside>
									<aside className='contentItem'>
										meant.peru@gmail.com
									</aside>
									<aside className='contentItem'>
										Empresa
									</aside>
								</article>
							</div>
						</section>

					</TabPanel>
					<TabPanel>
					
						<section className="usersTable">
							{/* <img src={ilusEmpty} alt="empty" />
							<p>No se encontraron postulaciones</p> */}
							<h2>Publicaciones</h2>
							<div className="tableUsers">
								<article className='headerRow'>
									<aside className='headerItem'>
										Nombre
									</aside>
									<aside className='headerItem'>
										Empresa
									</aside>
									<aside className='headerItem'>
										Cartera
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Product Designer
									</aside>
									<aside className='contentItem'>
										CSTI Corp
									</aside>
									<aside className='contentItem'>
										Nmancilla
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Jr Visual Designer
									</aside>
									<aside className='contentItem'>
										CSTI Corp
									</aside>
									<aside className='contentItem'>
										Nmancilla
									</aside>
								</article>
								<article className='contentRow'>
									<aside className='contentItem'>
										Ux Designer
									</aside>
									<aside className='contentItem'>
										Meant sac
									</aside>
									<aside className='contentItem'>
										jvazquez
									</aside>
								</article>

							</div>
						</section>
					</TabPanel>
				</Tabs>
			</section>
			<Footer />
		</React.Fragment>
	);
}
