import React, { useEffect, useState } from 'react';
import Header from '../components/shared/header';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckButton from '../components/shared/atom/checkButton';
import toast, { Toaster } from 'react-hot-toast';
import { Txtfield, DropdownMenu, DropdownItem, BtnPrimary } from '../components/shared/styled';
import 'react-tabs/style/react-tabs.css';
import './../sass/pages/_applyJob.scss';
import Footer from '../components/shared/footer';
import { usePostForm, usePostJob } from '../hooks/usePostJob';
import { useTab } from '../hooks/useTab';
import { useNavigate, useParams } from 'react-router-dom';
import { PostJob } from '../types/post_job';
import { get } from 'lodash';
import { postulateJob } from '../util/job.service';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { getCategory, getSkillForCategory } from '../util/publication.service';
import { Category } from '../interfaces/Category';
import { Response } from '../interfaces/Response';
import { Skill, SkillSelect } from '../interfaces/Skill';
import { TagComponent } from '../components/shared/atom/tag';
import { clearOneLocalStorage, getLocalStorage } from '../helpers/localStorage';
import { CREATE_USER, TEM_USER, USER_EXISTING } from '../helpers/constants';
import { register } from '../util/auth.service';

export const RegisterPostulant = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [categorys, setCategorys] = useState<Category[]>([]);
	const [skills, setSkills] = useState<SkillSelect[]>([]);
	// const { handleForm, reset } = usePostForm();

	const [form, setForm] = React.useState({
		documentType: '',
		documentNumber: '',
		category: '',
		skillsIds: [],
		typeBio: '',
		linkBio: '',
		experience: [],
		project: '',
		timeProject: '',
		functions: '',
	});

	const reset = () => {
		setForm({
			documentType: '',
			documentNumber: '',
			category: '',
			skillsIds: [],
			typeBio: '',
			linkBio: '',
			experience: [],
			project: '',
			timeProject: '',
			functions: '',
		});
	};

	// const navigate = useNavigate();
	const { selectedTab, handleNextTab, setSelectedTab } = useTab();

	useEffect(() => {
		(async () => {
			await getCategoryAll();
		})();
	}, []);

	useEffect(() => {
		// console.log('listar categoria');
		// console.log(form.category);
		(async () => {
			await getSkillsForCategory(form.category);
		})();
	}, [form.category]);

	const getSkillsForCategory = async (idCategory: string) => {
		const response = await getSkillForCategory({ idCategory });
		if (response.status) {
			const newData: SkillSelect[] = response?.data.skillGeneral.map((s) => {
				return { _id: s._id, nameSkill: s.nameSkill, select: false };
			});
			const uniquesSkills = [...new Map(newData.map((i: SkillSelect) => [i._id, i])).values()];
			// console.log({ uniquesSkills });
			setSkills([...uniquesSkills]);
		}
	};

	const handleForm = (event: any) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const getCategoryAll = async () => {
		const response: Response = await getCategory();
		console.log({ response });
		if (response.status) setCategorys(response?.data);
	};

	const handleRegister2 = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		const tempUser = getLocalStorage(TEM_USER);
		// console.log({ tempUser });
		const skillSelect: string[] = [];
		skills.filter((s: SkillSelect) => s.select && skillSelect.push(s._id));
		const selectCategory = categorys.find((c: Category) => {
			return c._id === form.category;
		});
		const dataSend = {
			...tempUser,
			dataUser: {
				...tempUser.dataUser,
				...form,
				category: selectCategory,
				skillsIds: [...skillSelect],
			},
		};

		console.log({ dataSend });

		const response = await register(dataSend);

		switch (response.data.message) {
			case CREATE_USER:
				clearOneLocalStorage(TEM_USER);
				reset();
				toast.success('Se creo el usuario correctamente...');
				setTimeout(() => {
					setLoading(false);
					navigate('/login', { replace: true });
				}, 2000);
				return;
			case USER_EXISTING:
				toast.error('el usuario ya existe');
				// alert('el usuario ya existe');
				return;
			default:
				toast.error('error en el servidor');
				// alert('Error corregir esto :c');
				break;
		}
	};

	const selectItemSkill = (skill: SkillSelect) => {
		const newData: SkillSelect[] = [];
		skills.filter((s: SkillSelect) => {
			if (s._id === skill._id) {
				s.select = !s.select;
			}
			newData.push(s);
		});
		setSkills([...newData]);
	};

	return (
		<React.Fragment>
			{/* <Backdrop
				open={loading!}
				style={{
					background: 'white',
					zIndex: 99,
				}}
			>
				<CircularProgress color="inherit" />
			</Backdrop> */}
			<Header />
			<Toaster position="top-right" reverseOrder={false} />
			<form>
				<section className="applyJob">
					<aside className="coverHeader mb-5">
						{/* <h1 className="mb-2">{get(_postJob, 'title', '')}</h1>
						<p>
							<i>{get(_postJob.dataCompany, 'businessName', '')}</i>
						</p> */}
					</aside>
					<aside className="contain">
						<Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
							<TabList className={'mb-5'}>
								<Tab tabIndex={'0'}>Datos generales</Tab>
								<Tab tabIndex={'1'}>Skills</Tab>
								<Tab tabIndex={'2'}>Experiencia</Tab>
							</TabList>
							<TabPanel tabIndex={0}>
								<section className="formApply pt-5">
									<article className="mb-5">
										<p className="mb-3">Comprobante de pago a emitir</p>
										<aside className="FormGroup">
											<DropdownMenu onChange={handleForm} name="documentType" value={form.documentType}>
												<DropdownItem>Elige el tipo de documento</DropdownItem>
												<DropdownItem value="1">RUC</DropdownItem>
												<DropdownItem value="2">DNI</DropdownItem>
											</DropdownMenu>
											<Txtfield className="ml-5" placeholder="Nro de documento" name="documentNumber" onChange={handleForm} value={form.documentNumber} />
										</aside>
									</article>
									<article className="footerSection">
										<BtnPrimary type="button" onClick={handleNextTab}>
											{' '}
											Siguiente{' '}
										</BtnPrimary>
									</article>
								</section>
							</TabPanel>
							<TabPanel tabIndex={1}>
								<section className="formApply pt-5">
									<article>
										<p className="mb-3">Eligue tu especialidad</p>
										<aside className="FormGroup">
											<DropdownMenu onChange={handleForm} name="category" value={form.category}>
												<DropdownItem>Eliga tipo de moneda</DropdownItem>
												{categorys.map((category: Category) => (
													<DropdownItem key={category._id} value={category._id}>
														{category.nameCategory}
													</DropdownItem>
												))}
											</DropdownMenu>
										</aside>
									</article>
									<p>Elige las skills que mejor manejes</p>
									<article className="gridBox mt-4">
										{/* {get(_postJob, 'listSkills', []).map((value) => (
											<CheckButton value={value} onChange={handleCheck} withbg="yes" label={value.nameSkill} key={value._id} />
										))} */}
										{skills.map((e: SkillSelect) => (
											<TagComponent key={e._id} tag={e} select={e.select} event={(e: SkillSelect) => selectItemSkill(e)} />
										))}
									</article>
									<article className="footerSection">
										<BtnPrimary type="button" onClick={handleNextTab}>
											{' '}
											Siguiente{' '}
										</BtnPrimary>
									</article>
								</section>
							</TabPanel>
							<TabPanel tabIndex={2}>
								<section className="formApply pt-5">
									<article className="mb-5">
										<p className="mb-3 text-center">Enlace digital de experiencia laboral (Certijoven, Linkedin, Web, etc)</p>
										<aside className="FormGroup">
											<DropdownMenu onChange={handleForm} name="typeBio" value={form.typeBio}>
												<DropdownItem>Seleccione tipo de enlace </DropdownItem>
												<DropdownItem value="1">Linkedin</DropdownItem>
												<DropdownItem value="2">Web</DropdownItem>
											</DropdownMenu>
											<Txtfield className="ml-5" placeholder="Ingrese enlace" onChange={handleForm} name="linkBio" value={form.linkBio} />
										</aside>
									</article>
									<article className="mb-5">
										<p className="text-center mb-3">ó , coloca tu experiencia respecto al puesto que buscamos</p>
										<aside className="FormGroup">
											<Txtfield className="mr-5" placeholder="Proyecto" onChange={handleForm} name="project" value={form.project} />
											<Txtfield className="" placeholder="Tiempo de trabajo" onChange={handleForm} name="timeProject" value={form.timeProject} />
										</aside>
										<aside className="FormGroup-full mt-4">
											<Txtfield placeholder="Funciones que realizaste" onChange={handleForm} name="functions" value={form.functions} />
										</aside>
									</article>

									<article className="footerSection">
										{/* <BtnPrimary type="submit"> Registrar </BtnPrimary> */}
										<BtnPrimary disabled={loading} onClick={handleRegister2}>
											Registrar
										</BtnPrimary>
									</article>
								</section>
							</TabPanel>
						</Tabs>
					</aside>
				</section>
			</form>
			<Footer />
		</React.Fragment>
	);
};
