import React, { Fragment, useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Header from '../components/shared/header';
import { Txtfield, BtnPrimary } from '../components/shared/styled';
import './../sass/pages/_myAccount.scss';
import './../sass/pages/_dashboard.scss';
import Footer from '../components/shared/footer';
import { ListUser } from '../util/user.service';
import { getAllJobs } from '../util/job.service';

import { POSTULANT, COMPANY, SALES } from '../helpers/constants';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';
import { usePostJob } from '../hooks/usePostJob';

export default function Dashboard() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { startLogout, startUpdateUser } = useAuth();
	const [aUser, setAUser] = useState<any>({
		businessName: '',
		email: '',
		rol: '',
	});

	const {
		postJobsState: { loading, postJobs },
	} = usePostJob();

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

	console.log('postJobsState', postJobs);

	useEffect(() => {
		(async () => {
			const response = await ListUser();
			console.log('response', response.data.dataUser);
			setAUser(response.data.dataUser);
		})();
	}, []);

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
							<Tab>Empresas</Tab>
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
								<article className="headerRow">
									<aside className="headerItem">Nombres</aside>
									<aside className="headerItem">Correo</aside>
									<aside className="headerItem">Rol</aside>
								</article>
								<article className="contentRow">
									<aside className="contentItem">{aUser.businessName}</aside>
									<aside className="contentItem">{aUser.email}</aside>
									<aside className="contentItem">{aUser.rol === POSTULANT ? 'Postulante' : aUser.rol === COMPANY ? 'Empresa' : aUser.rol === SALES ? 'Asesor' : 'Admin'}</aside>
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
								<article className="headerRow">
									<aside className="headerItem">Nombre</aside>
									<aside className="headerItem">Empresa</aside>
									{/* <aside className="headerItem">Cartera</aside> */}
								</article>
								{postJobs.map((e: any) => (
									<article className="contentRow" key={e._id}>
										<aside className="contentItem">{e.title}</aside>
										<aside className="contentItem">{e.dataCompany.businessName}</aside>
										{/* <aside className="contentItem">Nmancilla</aside> */}
									</article>
								))}
							</div>
						</section>
					</TabPanel>
				</Tabs>
			</section>
			<Footer />
		</React.Fragment>
	);
}
