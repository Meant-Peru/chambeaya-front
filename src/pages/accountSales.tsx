import React, { Fragment, useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Header from '../components/shared/header';
import ilusEmpty from './../assets/empty-state.svg';
import { Txtfield, TxtArea, DropdownMenu, DropdownItem, BtnPrimary } from '../components/shared/styled';
import './../sass/pages/_myAccount.scss';
import Footer from '../components/shared/footer';

import { COMPANY, POSTULANT } from '../helpers/constants';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';

import { MyApply } from '../components/MyApply';
import ListCompany from '../components/ListCompany';

export default function AccountSales() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { startLogout, startUpdateUser } = useAuth();

	const [userSales, setUserSales] = useState({
		...user.dataUser,
	});

	const handleEvent = (e: any) => {
		setUserSales({
			...userSales,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdate = async () => {
		let dataSend = { ...user, dataUser: { ...userSales } };
		const respUpdate = await startUpdateUser(dataSend);
		console.log({ respUpdate });
	};

	const handleLogout = () => startLogout();

	if (Object.keys(user.dataUser).length === 0) return <Navigate replace to="/login" />;

	return (
		<React.Fragment>
			<Header />
			<section className="myAccountPage">
				<Tabs>
					<TabList className={'mb-5'}>
						<aside className="sideBarMenu mb-5">
							<h3 className="mb-2">Ventas</h3>
							<span>Gestionar Cartera</span>
						</aside>
						<div className="list">
							<Tab>Datos generales</Tab>
							<Tab>Mi cartera</Tab>
							<Tab>Proyectos</Tab>
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
									<Txtfield onChange={handleEvent} value={userSales.name} name="name" placeholder="Nombres" />
									<Txtfield onChange={handleEvent} value={userSales.lastName} name="lastName" placeholder="Apellidos" />
								</aside>
								<aside className="FormGroup mt-2 mb-5">
									<Txtfield onChange={handleEvent} value={userSales.email} name="email" placeholder="Correo electrónico" />
									<Txtfield onChange={handleEvent} value={userSales.phone} name="phone" placeholder="Teléfono" />
								</aside>

								<aside>
									{/* <ButtonComponent  family="primary" label="Actualizar" /> */}
									<BtnPrimary onClick={handleUpdate}>Actualizar</BtnPrimary>
								</aside>
							</Fragment>
						</section>
					</TabPanel>
					<TabPanel>
						{/* <section className="apply">
							<img src={ilusEmpty} alt="empty" />
							<p>No se encontraron postulaciones</p>

						</section> */}
						<ListCompany />
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
