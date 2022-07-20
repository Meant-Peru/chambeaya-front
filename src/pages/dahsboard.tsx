import React, { Fragment, useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Header from '../components/shared/header';
import { Txtfield, BtnPrimary } from '../components/shared/styled';
import './../sass/pages/_myAccount.scss';
import './../sass/pages/_dashboard.scss';
import Footer from '../components/shared/footer';
import { getSkill } from '../util/skill.services';
import { getCompanyAll } from '../util/company.service';

import { GetCategory } from '../util/category.service';

import { POSTULANT, COMPANY, SALES } from '../helpers/constants';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';
import { usePostJob } from '../hooks/usePostJob';
import { Reports } from '../components/Reports';

export default function Dashboard() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { startLogout, startUpdateUser } = useAuth();

	const {
		postJobsState: { loading, postJobs },
	} = usePostJob();

	const [postulant, setPostulant] = useState({
		...user.dataUser,
	});

	const [company, setCompany] = useState({
		...user.dataUser,
	});


	const [skill, setSkill] = useState([]);

	const [allCompany, setAllCompany] = useState([]);

	const [category, setCategory] = useState([]);

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
	

			const responseSkill = await getSkill();
			setSkill(responseSkill.data.data);

			const responseCategory = await GetCategory();
			setCategory(responseCategory.data.data);

			const responseAllCompany = await getCompanyAll();
			setAllCompany(responseAllCompany.data.data);
			
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
							<Tab>Reportes</Tab>
							<Tab>Especialidades</Tab>
							<Tab>Skill</Tab>
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
									{/* <ButtonComponent  family="primary" label="Actualizar" /> */}
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
									<aside className="headerItem">Razon social</aside>
									<aside className="headerItem">Correo</aside>
								
								</article>
								{allCompany.map((p: any) => (
									<article className="contentRow" key={p._id}>
										<aside className="contentItem">{p.businessName}</aside>
										<aside className="contentItem">{p.email}</aside>

									</article>
								))}
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
					<TabPanel>
						<Reports />
					</TabPanel>
					<TabPanel>
						<h2>Especialidades</h2>
						{/* {category.map((e) => <><br /><h1>{e.nameCategory}</h1></>)} */}
						<div className="tableUsers">
							<article className="headerRow">
								<aside className="headerItem">Nombre</aside>
								<aside className="headerItem">Descripción</aside>
								<aside className="headerItem flex-end">Acciones</aside>
							</article>
							{category.map((e: any) => (
								<article className="contentRow" key={e._id}>
									<aside className="contentItem">{e.nameCategory}</aside>
									<aside className="contentItem">{e.descriptionCategory}</aside>
									<aside className="contentItem flex-end"> Agregar Posiciones</aside>
								</article>
							))}
						</div>
					</TabPanel>
					<TabPanel>
						<h2>Skill</h2>


						<div className="tableUsers">
							<article className="headerRow">
								<aside className="headerItem">Nombre</aside>
								<aside className="headerItem">Descripción</aside>
								<aside className="headerItem flex-end">Acciones</aside>
							</article>
							{skill.map((e: any) => (
								<article className="contentRow" key={e._id}>
									<aside className="contentItem">{e.nameSkill}</aside>
									<aside className="contentItem">{e.descriptionskill}</aside>
									<aside className="contentItem flex-end"> Asociar con posición</aside>
								</article>
							))}
						</div>
					</TabPanel>
				</Tabs>
			</section>
			<Footer />
		</React.Fragment>
	);
}
