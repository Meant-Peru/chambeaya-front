import React, { Fragment, useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Header from '../components/shared/header';
import Modal from 'react-modal';
import { Txtfield, BtnPrimary , BtnSecondary , TxtArea} from '../components/shared/styled';
import ButtonComponent from '../components/shared/atom/button';
import './../sass/pages/_myAccount.scss';
import './../sass/pages/_dashboard.scss';
import Footer from '../components/shared/footer';
import toast, { Toaster } from 'react-hot-toast';
import { getSkill } from '../util/skill.services';
import { getCompanyAll } from '../util/company.service';

import { getCategory , createCategory } from '../util/category.service';

import { POSTULANT, COMPANY, SALES } from '../helpers/constants';
import { useNavigate , Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useAuth } from '../hooks/useAuth';
import { usePostJob , usePostForm } from '../hooks/usePostJob';
import { useCatForm } from '../hooks/useCategory';
import { Reports } from '../components/Reports';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
	}
};

export default function Dashboard() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { startLogout, startUpdateUser } = useAuth();
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const { handleForm, reset } = usePostForm();
	const { formcat, handleFormCat, resetCat } = useCatForm();
	const navigate = useNavigate();

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

	const [allcategory, setAllCategory] = useState([]);

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

	useEffect(() => {
		(async () => {
	

			const responseSkill = await getSkill();
			setSkill(responseSkill.data.data);

			const responseCategory = await getCategory();
			setAllCategory(responseCategory.data.data);

			const responseAllCompany = await getCompanyAll();
			setAllCompany(responseAllCompany.data.data);
			
		})();
	}, []);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//   subtitle.style.color = '#f00';
	}

	const submit = async (event: any) => {
		event.preventDefault();
		console.log(formcat)
		await createCategory(formcat);
		toast.success('Has registrado una nueva especialidad!');
		resetCat();
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
					<div className="dflex flex-row mt-4 mb-4 algn-center">
						<h2>Especialidades</h2>
						<BtnPrimary onClick={openModal}> Agregar nueva </BtnPrimary>
					</div>
						{/* {category.map((e) => <><br /><h1>{e.nameCategory}</h1></>)} */}
						<div className="tableUsers">
							<article className="headerRow">
								<aside className="headerItem">Nombre</aside>
								<aside className="headerItem">Descripción</aside>
								<aside className="headerItem flex-end">Acciones</aside>
							</article>
							{allcategory.map((e: any) => (
								<article className="contentRow" key={e._id}>
									<aside className="contentItem">{e.nameCategory}</aside>
									<aside className="contentItem">{e.descriptionCategory}</aside>
									<ButtonComponent family="secondary" link={'/list-posiciones/' + e._id} label="Ver posiciones" />
								</article>
							))}
						</div>
						<Toaster position="top-right" reverseOrder={false} />
						<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
						<h2 className="text-center">Nueva Especialidad</h2>
						<p className="mt-2 text-center">
							<i>Ingresa nueva posición , relacionalo a una especialidad</i>
						</p>
						<aside className="FormGroup algn-center">
							<form onSubmit={submit}>
								<div className="dflex flex-row mt-4 mb-4 algn-center">
								<Txtfield placeholder="Nombre" onChange={handleFormCat} name="nameCategory" value={formcat.nameCategory} />
								</div>
								<div className="dflex flex-row mt-4 mb-4 algn-center">
								<TxtArea placeholder="Descripción" onChange={handleFormCat} name="descriptionCategory" value={formcat.descriptionCategory}/>
								</div>
								<BtnSecondary className='mr-2' onClick={closeModal}>CANCELAR</BtnSecondary>
								<BtnPrimary type="submit"> GUARDAR </BtnPrimary>
							</form>
						</aside>
					 </Modal>

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
