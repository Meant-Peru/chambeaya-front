import * as React from 'react';
import { useState } from 'react';
import Header from '../components/shared/header';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { KeyboardReturn } from "@material-ui/icons";

import ilusEmpty from './../assets/empty-state.svg';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { Txtfield, DropdownMenu, DropdownItem, TxtArea, BtnPrimary } from './../components/shared/styled';
import 'react-tabs/style/react-tabs.css';
import './../sass/pages/_myAccount.scss';
import Footer from '../components/shared/footer';
import ButtonComponent from '../components/shared/atom/button';

import { postJobCompany } from './../util/job.service';
import { getCategory, getPosition, createPosition, getSkill } from '../util/publication.service';
import { Response } from '../interfaces/Response';
import { Category } from '../interfaces/Category';
import { Position } from '../interfaces/Position';
import { TagComponent } from '../components/shared/atom/tag';
import { respSkill, Skill } from '../interfaces/Skill';
import { PostJob } from '../interfaces/PostJob';
import { CREATE_POST } from '../helpers/constants';
import { useNavigate } from 'react-router-dom';
import {clearLocalStorage} from "../helpers/localStorage";
import {logout} from "../redux/slices/authSlice";
import {useDispatch} from "react-redux";

export default function AddJob() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [encounter, setEncounter] = React.useState(true);
	const [categorys, setCategorys] = React.useState<Category[]>([]);
	const [positions, setPositions] = React.useState<Position[]>([]);
	const [skills, setSkills] = React.useState<any[]>([]);
	const [skillSelected, setSkillSelected] = React.useState<Skill[]>([]);
	const loading = open && skills.length === 0;

	const [form, setForm] = React.useState({
		title: '',
		description: '',
		modality: '',
		timeEstimated: '',
		salaryRange: '',
		funtionsPost: '',
		location: '',
		priority: 1,
		typePost: 1
	});

	const [positionSelected, setPositionSelected] = React.useState<any>({
		id: '',
		id_category: '',
		id_user: '',
		namePosition: '',
		description: '',
	});

	const [job, setJob] = React.useState({
		description: '',
		idCompany: '',
		modality: '',
		timeEstimated: '',
		salaryRange: '',
		funtionsPost: '',
		idCategory: '',
		idPosition: '',
		idSkills: '',
	});

	const [position, setPosition] = React.useState({
		idCategory: '',
		namePosition: '',
		description: '',
	});

	const dispatch = useDispatch();

	const handleLogout = () => {
		startLogout();
	};

	const startLogout = () => {
		clearLocalStorage();
		dispatch(logout());
		navigate('/login', { replace: true });
	};

	const [skillPayload, setSkillPayload] = React.useState({ idCategory: '', idPositon: '' });

	React.useEffect(() => {
		(async () => {
			await getCategoryAll();
		})();
	}, []);

	const getCategoryAll = async () => {
		const response: Response = await getCategory();
		if (response.status) setCategorys(response.data);
	};

	const handleEvent = (e: any) => {
		setJob({
			...job,
			[e.target.name]: e.target.value,
		});
	};

	const handleEventFrom = (e: any) => {
		let result = e.target.value.replace(/[^a-z]/gi, '');
		if (e.target.name === 'salaryRange') {
			console.log(e.target.name);
			e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g);
		}
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSearch = (e: any, value: any) => {
		setEncounter(true);
		// const value = e.target.value;
		// console.log({ value });
		setPosition({ ...position, namePosition: value });
		if (positions.length === 0 && value.length > 0) setEncounter(false);

		for (let index in positions) {
			const item = positions[index];
			const title = item.namePosition;
			if (value.length != 0 && title.length != 0) {
				if (title.toLowerCase().search(value.toLowerCase()) != -1) {
					setSkillPayload({ ...skillPayload, idPositon: item._id });
					setPositionSelected(item);
					setEncounter(true);
					return;
				}
				setEncounter(false);
			}
		}
	};

	const handlePosition = async (event: any) => {
		const value = event.target.value;
		setPositions([]);
		setSkills([]);
		setSkillSelected([]);
		if (value !== '0') {
			setPosition({ ...position, idCategory: value });
			setSkillPayload({ ...skillPayload, idCategory: value });
			const response: Response = await getPosition({ idCategory: value });
			setPositions(response.data);
		}
	};

	const addSkill = async (e: any, value: any) => {
		// const value = event.target.value;
		console.log({ value });
		if (value !== '0') {
			const select: Skill = skills.find((k: Skill) => k.nameSkill.toLowerCase() === value.toLowerCase());
			console.log({ select });
			if (select) {
				const uniqe: Skill = skillSelected.find((k: Skill) => k._id === select._id);
				console.log({ uniqe });
				if (!uniqe) {
					setSkillSelected([...skillSelected, select]);
				}
			}
		}
		// console.log({ skillSelected });
	};

	const addPosition = async () => {
		const response: Response = await createPosition(position);
		if (response.status) {
			const response: Response = await getPosition({ idCategory: position.idCategory });
			setPositions(response.data);
		}
	};

	const getSkills = async () => {
		console.log({ positionSelected });
		setSkillPayload({ ...skillPayload, idPositon: positionSelected.id, idCategory: positionSelected.idCategory });
		/* TODO: */
		// console.log({ idPositon: '55915275-71b2-c739-b4df-5202ecc5e9d' }, { idCategory: '8b525a9e-f535-b3be-c756-71011b442339' });
		// setSkillPayload({ ...skillPayload, idPositon: '55915275-71b2-c739-b4df-5202ecc5e9d', idCategory: '8b525a9e-f535-b3be-c756-71011b442339' });
	};

	const removeItemSkill = async (select: Skill) => {
		console.log({ select });
		const deletes: Skill[] = skillSelected.filter((k: Skill) => k._id !== select._id);
		setSkillSelected([...deletes]);
	};

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			console.log(skillPayload.idCategory, skillPayload.idPositon);
			if (skillPayload.idCategory !== '' || skillPayload.idPositon !== '') {
				const response = await getSkill(skillPayload);
				const skillsData: respSkill = response.data;
				const skillsArray: Skill[] = [];
				if (skillsData.skillGeneral.length > 0) {
					for (let i = 0; i < skillsData.skillGeneral.length; i++) {
						skillsArray.push({ ...skillsData.skillGeneral[i], level: 'primary' });
					}
				}
				if (skillsData.skillPosition.length > 0) {
					for (let i = 0; i < skillsData.skillPosition.length; i++) {
						skillsArray.push({ ...skillsData.skillPosition[i], level: 'secondary' });
					}
				}
				if (skillsData.skillPositionUser.length > 0) {
					for (let i = 0; i < skillsData.skillPositionUser.length; i++) {
						skillsArray.push({ ...skillsData.skillPositionUser[i], level: 'terceary' });
					}
				}
				const uniquesSkills = [...new Map(skillsArray.map((i: Skill) => [i._id, i])).values()];
				// console.log({ uniquesSkills });
				setSkills(uniquesSkills);
			}
		})();

		return () => {
			active = false;
		};
	}, [skillPayload.idPositon, loading]);

	React.useEffect(() => {
		if (!open) {
			//   setOptions([]);
		}
	}, [open]);

	const goBack = () => {
		navigate("/myaccount/1");
	  };
	const handleCreatePost = async () => {
		if (form.modality !== '0') {
			const sendData: PostJob = {
				title: form.title,
				description: form.description,
				modality: form.modality,
				timeEstimated: form.timeEstimated,
				salaryRange: form.salaryRange,
				funtionsPost: form.funtionsPost,
				idCategory: skillPayload.idCategory,
				idPosition: skillPayload.idPositon,
				location: form.location,
				priority: form.priority,
				idSkills: [...skillSelected.map((i) => i._id)],
				typePost: form.typePost
			};
			console.log({ sendData });
			const resp = await postJobCompany(sendData);
			console.log({ resp });
			if (resp.data.message === CREATE_POST) {
				alert('Se creo la publicación correctamente...');
				navigate('/myaccount/1', { replace: true });

		} else {
				alert('Error al crear la publicación');
			}
		} else {
			alert('Seleccione Modalidad');
		}
	};

	return (
		<React.Fragment>
			<Header />
			<section className="myAccountPage">
				<Tabs defaultIndex={1}>
					<TabList className={'mb-5'}>
						<aside className="sideBarMenu mb-5">
							<h3 className="mb-2">Mi Cuenta</h3>
							<span>Gestiona tu cuenta</span>
							<p className="mb-1 mt-1"><a onClick={handleLogout}>Cerrar Sesión</a></p>
						</aside>
						<div className="list">
							<Tab>Datos generales</Tab>
							<Tab>Mis publicaciones</Tab>
							<Tab>Proyectos</Tab>
						</div>
					</TabList>

					<TabPanel>
						<section className="sectionTab">
							<aside>
								<article className="headSection">
									<h2>Datos Generales</h2>
								</article>
							</aside>

							<p>Datos Personales</p>
							<aside className="FormsRow mt-3">
								<Txtfield onChange={handleEvent} name="name" placeholder="Nombres" />
								<Txtfield placeholder="Apellidos" />
							</aside>

							<aside className="FormsRow mt-2 mb-5">
								<Txtfield placeholder="Correo electrónico" />
								<Txtfield placeholder="Teléfono" />
							</aside>

							<p>Datos de Pago</p>
							<aside className="FormsRow mt-3">
								<DropdownMenu>
									<DropdownItem>Tipo de comprobante</DropdownItem>
									<DropdownItem>Recibo por Honorarios</DropdownItem>
									<DropdownItem>Factura</DropdownItem>
									<DropdownItem>Recibo</DropdownItem>
								</DropdownMenu>
								<Txtfield placeholder="Nro de comprobante" />
							</aside>
							<aside className="FormsRow mt-2 mb-5">
								<DropdownMenu>
									<DropdownItem>Banco de destino</DropdownItem>
									<DropdownItem>Banco de Crédito del Perú</DropdownItem>
									<DropdownItem>BBVA</DropdownItem>
								</DropdownMenu>
								<Txtfield placeholder="Nro de cuenta" />
							</aside>
							<aside style={{display:'flex', justifyContent:'center'}}>
								<ButtonComponent family="primary" label="Actualizar" />
							</aside>
						</section>
					</TabPanel>
					<TabPanel>
						<section className="sectionTab">
							<aside>
							
							<p style={{fontSize:'0.75em',cursor :'pointer',display:'flex',alignItems:'center'}}  onClick={() => goBack()} className="mb-1 mt-1">
								<KeyboardReturn />
								Ver todas mis publicaciones</p>
								<article className="headSection">
									<h2>Nueva publicación</h2>
								</article>
							</aside>
							<aside className="FormsRow">
								<aside className="FormGroup mt-3">
									<p>Título</p>
									<Txtfield placeholder="Título de proyecto" onChange={handleEventFrom} value={form.title} name="title" />
								</aside>
							</aside>
							<aside className="FormsRow">
								<aside className="FormGroup mt-3">
									<p>Rubro</p>
									<DropdownMenu onChange={handlePosition}>
										<DropdownItem value={'0'}>Elegir rubro</DropdownItem>
										{categorys.map((category: Category) => (
											<DropdownItem key={category._id} value={category._id}>
												{category.nameCategory}
											</DropdownItem>
										))}
									</DropdownMenu>
								</aside>
								<aside className="FormGroup mt-3">
									<p>Posición</p>
									{/* <Txtfield placeholder="Posición" /> */}
									<Autocomplete
										disableListWrap
										freeSolo
										id="free-solo-2-demo"
										disableClearable
										className="border__none"
										options={positions.map((option) => option.namePosition)}
										onChange={(e, value) => handleSearch(e, value)}
										renderInput={(params) => (
											<TextField
												className="border__none"
												{...params}
												// label="Nombre de la posición"
												InputProps={{
													...params.InputProps,
													type: 'search',
													disableUnderline: true,
												}}
												// onChange={handleSearch}
												sx={{
													'& .MuiInputLabel-root': {
														color: 'transparent',
													},
													'& .MuiOutlinedInput-root': {
														'& > fieldset': {
															borderRadius: 20,
															borderColor: 'transparent',
														},
													},
												}}
											/>
										)}
									/>
								</aside>
								{/* <aside className="FormGroup">
									<br />
									<BtnPrimary onClick={getSkills}>Buscar</BtnPrimary>
								</aside> */}
								<aside className="FormGroup">
									<br />
									{!encounter && <BtnPrimary onClick={addPosition}>Crear Posición</BtnPrimary>}
								</aside>
							</aside>
							<aside className="FormsRow">
								<aside className="FormGroup mt-3">
									<p>Agregar Skill</p>
									<Autocomplete
										onOpen={() => {
											setOpen(true);
										}}
										onClose={() => {
											setOpen(false);
										}}
										disableListWrap
										freeSolo
										id="free-solo-3-demo"
										disableClearable
										className="border__none"
										options={skills.map((k: Skill) => k.nameSkill)}
										onChange={(e, value) => addSkill(e, value)}
										renderInput={(params) => (
											<TextField
												className="border__none"
												{...params}
												InputProps={{
													...params.InputProps,
													type: 'search',
													disableUnderline: true,
													endAdornment: (
														<React.Fragment>
															{loading ? <CircularProgress color="inherit" size={20} /> : null}
															{params.InputProps.endAdornment}
														</React.Fragment>
													),
												}}
												sx={{
													'& .MuiInputLabel-root': {
														color: 'transparent',
													},
													'& .MuiOutlinedInput-root': {
														'& > fieldset': {
															borderRadius: 20,
															borderColor: 'transparent',
														},
													},
												}}
											/>
										)}
									/>
								</aside>
							</aside>
							<aside className="FormsRow">
								<aside className="FormGroup mt-3">
									<p>Skills</p>
									<article className="skillsBox">
										{skillSelected.map((e: Skill) => (
											<TagComponent  key={e._id} tag={e} eventD={(e: any) => removeItemSkill(e)} />
										))}
									</article>
								
								</aside>
							</aside>

							<aside className="FormsRow">
								<aside className="FormGroup--full mt-3">
									<p>Descripción</p>
									<TxtArea placeholder="Descripción de la publicación" onChange={handleEventFrom} value={form.description} name="description" />
								</aside>
							</aside>
							<aside className="FormsRow">
								<aside className="FormGroup--full mt-3">
									<p>Funciones</p>
									<TxtArea placeholder="Funciones a desempeñar" onChange={handleEventFrom} value={form.funtionsPost} name="funtionsPost" />
								</aside>
							</aside>
							<aside className="mt-5">
								<h4>Precisiones</h4>
								<aside className="FormsRow">
									<aside className="FormGroup mt-3">
										<p>Duración</p>
										<Txtfield placeholder="Duración de proyecto" onChange={handleEventFrom} value={form.timeEstimated} name="timeEstimated" />
									</aside>
									<aside className="FormGroup mt-3">
										<p>Presupuesto</p>
										<Txtfield placeholder="Presupuesto" onChange={handleEventFrom} value={form.salaryRange} name="salaryRange" />
									</aside>
									<aside className="FormGroup mt-3">
										<p>Modalidad</p>
										<DropdownMenu onChange={handleEventFrom} name="modality">
											<DropdownItem value={'0'}>Elegir modalidad</DropdownItem>
											<DropdownItem value={'Híbrido'}>Híbrido</DropdownItem>
											<DropdownItem value={'Presencial'}>Presencial</DropdownItem>
											<DropdownItem value={'Remoto'}>Remoto</DropdownItem>
										</DropdownMenu>
									</aside>
								</aside>
							</aside>
							<aside className="FormsRow">
								<aside className="FormGroup mt-3">
									<p>¿Qué tipo de publicación deseas adquirir?</p>
									<DropdownMenu onChange={handleEventFrom} name="typePost">
										<DropdownItem value={'_none'}>Elegir tipo de publicación</DropdownItem>
										<DropdownItem value={'1'}>Publicación gratuita</DropdownItem>
										<DropdownItem value={'2'}>Publicación simple</DropdownItem>
										<DropdownItem value={'3'}>Publicación del proyecto</DropdownItem>
									</DropdownMenu><br />
									<div className="notes">
									<p>Notas: </p>
									<ul>
										<li>Publicación simple que estará en la plataforma durante 30 días</li>
										<li>Es tu mejor opción para contratar servicios presenciales o trabajos por horas. Transfiere a la cuenta de XXXXXXX o YYYYYY para poder iniciar caso contrario se eliminará su publicación en 24 horas.</li>
										<li>Publicación promedio, pago asegurando un gantt de seguimiento, pago del proyecto por adelantado y se le puede asignar un usuario de reemplazo de NO cumplir con las fechas. Transfiere a la cuenta de XXXXXXX o YYYYYY para poder iniciar caso contrario se eliminará su publicación en 24 horas.</li>
									</ul>
									</div>
								</aside>
							</aside>
							<aside className="mt-4" style={{display:'flex', justifyContent:'center'}} >
								{/* <ButtonComponent family="primary" label="Agregar" /> */}
								<BtnPrimary onClick={handleCreatePost}>Agregar</BtnPrimary>
							</aside>
						</section>
						{/* <section className="apply">
              <img src={ilusEmpty} alt="empty" />
              <p>No se encontraron publicaciones</p>
            </section> */}
					</TabPanel>
					<TabPanel>
						<section className="sectionTab">
							<aside className="mb-5">
								<article className="headSection">
									<h2>Proyectos</h2>
								</article>
							</aside>
							<aside className="FormsRow">
								<article className="proyects">
									<img src={ilusEmpty} alt="empty" />
									<p>Aún no ingresaste a algún proyecto</p>
								</article>
							</aside>
						</section>
					</TabPanel>
					<TabPanel>
						<section className="sectionTab">
							<aside className="mb-5">
								<article className="headSection">
									<h2>Facturación</h2>
								</article>
							</aside>
							<aside className="FormsRow">
								<article className="proyects">
									<img src={ilusEmpty} alt="empty" />
									<p>Tienes un plan free actualmente</p>
								</article>
							</aside>
						</section>
					</TabPanel>
				</Tabs>
			</section>
			<Footer />
		</React.Fragment>
	);
}
