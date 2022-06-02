import React, { Fragment, useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ButtonComponent from '../components/shared/atom/button';
import Header from '../components/shared/header';
import ilusEmpty from './../assets/empty-state.svg';
import { Txtfield, TxtArea, DropdownMenu, DropdownItem } from '../components/shared/styled';
import './../sass/pages/_myAccount.scss';
import Footer from '../components/shared/footer';

import { COMPANY, SESSION } from '../helpers/constants';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { getToken } from '../util/auth.service';
import { useAuth } from '../hooks/useAuth';

import check from './../assets/check.svg';
import negative from './../assets/negative.svg';

import Modal from 'react-modal';

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

	
	const navigation: any = useNavigate();

	const { user } = useSelector((state: RootState) => state.auth);
	const { validateToken } = useAuth();

	const [postulant, setPostulant] = useState({
		name: '',
		last_name: '',
		email: '',
		phone: '',
		rolUser: '',
		sex: '',
		birthDayDate: new Date(),
	});

	const [company, setCompany] = useState({
		business_name: '',
		email: '',
		phone: '',
		rolUser: '',
		description: '',
		ruc: '',
	});

	useEffect(() => {
		// validateSession;
	}, []);

	const handleEvent = (e: any) => {
		console.log(e);
		setCompany({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogout = () => {
		localStorage.removeItem(SESSION);
		navigation('/login', { replace: true });
	};

	if (user === null) return <Navigate replace to="/login" />;

	const validateSession = async () => {
		if (getToken) {
			const val = await validateToken(getToken);
			if (!val) return <Navigate replace to="/login" />;
		} else {
			return <Navigate replace to="/login" />;
		}
	};

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
							<Tab>Mis postulaciones</Tab>
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
										<Txtfield onChange={handleEvent} value={user.businessName} name="businessName" placeholder="Nombre de empresa" />
										<Txtfield onChange={handleEvent} value={user.ruc} name="ruc" placeholder="Nro de Documento" />
									</aside>
									<aside className="FormGroup mt-4 mb-4">
										<TxtArea onChange={handleEvent} value={user.description} name="description" placeholder="Descripción" />
									</aside>
									<aside className="FormGroup mt-2 mb-5">
										<Txtfield onChange={handleEvent} value={user.email} name="email" placeholder="Correo electrónico" />
										<Txtfield onChange={handleEvent} value={user.phone} name="phone" placeholder="Teléfono" />
									</aside>

									<aside>
										<ButtonComponent type="primary" label="Actualizar" />
									</aside>
								</Fragment>
							) : (
								<Fragment>
									<p>Datos personales</p>
									<aside className="FormGroup mt-3">
										<Txtfield onChange={handleEvent} value={user.name} name="name" placeholder="Nombres" />
										<Txtfield onChange={handleEvent} value={user.lastName} name="lastname" placeholder="Apellidos" />
									</aside>
									<aside className="FormGroup mt-2 mb-5">
										<Txtfield onChange={handleEvent} value={user.email} name="email" placeholder="Correo electrónico" />
										<Txtfield onChange={handleEvent} value={user.phone} name="phone" placeholder="Teléfono" />
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
										<ButtonComponent type="primary" label="Actualizar" />
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
            <section>
              <p>Historial</p>
              <aside className='listCards'>
                <article className='cardHistory'>
                  <div className="headCard">
                      <strong> UX Designer</strong>
                      <span>CSTI CORP</span>
                  </div>
                  <div className="contentCard">
                    <ul className='listCard'>
                      <li><img src={check} alt=""/> <span>Skills</span></li>
                      <li><img src={negative} alt=""/> <span>Presupuesto</span></li>
                      <li><img src={check} alt=""/> <span>Experiencia</span></li>
                    </ul>
                    <button className='btnComponent--textLink' onClick={openModal}> Ver Detalle </button>
				
					<Modal
						isOpen={modalIsOpen}
						onAfterOpen={afterOpenModal}
						onRequestClose={closeModal}
						style={customStyles}
						contentLabel="Example Modal"
						overlayClassName="Overlay"
					>
						<button onClick={closeModal}>close</button>

						<h2>Soy un modal</h2>
					
					</Modal>


                  </div>
                </article>

				<article className='cardHistory'>
                  <div className="headCard">
                      <strong> UX Designer</strong>
                      <span>CSTI CORP</span>
                  </div>
                  <div className="contentCard">
                    <ul className='listCard'>
                      <li><img src={check} alt=""/> <span>Skills</span></li>
                      <li><img src={negative} alt=""/> <span>Presupuesto</span></li>
                      <li><img src={check} alt=""/> <span>Experiencia</span></li>
                    </ul>
                    <button className='btnComponent--textLink' onClick={openModal}> Ver Detalle </button>
				
					<Modal
						isOpen={modalIsOpen}
						onAfterOpen={afterOpenModal}
						onRequestClose={closeModal}
						style={customStyles}
						contentLabel="Example Modal"
						overlayClassName="Overlay"
					>
						<button onClick={closeModal}>close</button>

						<h2>Soy un modal</h2>
					
					</Modal>


                  </div>
                </article>

				<article className='cardHistory'>
                  <div className="headCard">
                      <strong> UX Designer</strong>
                      <span>CSTI CORP</span>
                  </div>
                  <div className="contentCard">
                    <ul className='listCard'>
                      <li><img src={check} alt=""/> <span>Skills</span></li>
                      <li><img src={negative} alt=""/> <span>Presupuesto</span></li>
                      <li><img src={check} alt=""/> <span>Experiencia</span></li>
                    </ul>
                    <button className='btnComponent--textLink' onClick={openModal}> Ver Detalle </button>
				
					<Modal
						isOpen={modalIsOpen}
						onAfterOpen={afterOpenModal}
						onRequestClose={closeModal}
						style={customStyles}
						contentLabel="Example Modal"
						overlayClassName="Overlay"
					>
						<button onClick={closeModal}>close</button>

						<h2>Soy un modal</h2>
					
					</Modal>


                  </div>
                </article>

				<article className='cardHistory'>
                  <div className="headCard">
                      <strong> UX Designer</strong>
                      <span>CSTI CORP</span>
                  </div>
                  <div className="contentCard">
                    <ul className='listCard'>
                      <li><img src={check} alt=""/> <span>Skills</span></li>
                      <li><img src={negative} alt=""/> <span>Presupuesto</span></li>
                      <li><img src={check} alt=""/> <span>Experiencia</span></li>
                    </ul>
                    <button className='btnComponent--textLink' onClick={openModal}> Ver Detalle </button>
				
					<Modal
						isOpen={modalIsOpen}
						onAfterOpen={afterOpenModal}
						onRequestClose={closeModal}
						style={customStyles}
						contentLabel="Example Modal"
						overlayClassName="Overlay"
					>
						<button onClick={closeModal}>close</button>

						<h2>Soy un modal</h2>
					
					</Modal>


                  </div>
                </article>
				
              </aside>
            </section>

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
