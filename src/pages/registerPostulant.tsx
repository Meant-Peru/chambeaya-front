import React, { useEffect, useState } from 'react';
import Header from '../components/shared/header';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckButton from '../components/shared/atom/checkButton';
import toast, { Toaster } from 'react-hot-toast';
import {Txtfield, DropdownMenu, DropdownItem, BtnPrimary, Span} from '../components/shared/styled';
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
import { OptionComponent } from '../components/shared/atom/option';
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
		formErrors: [],
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
			formErrors: [],
		});
	};

	// const navigate = useNavigate();
	const {selectedTab, handleNextTab, setSelectedTab} = useTab(form);

	useEffect(() => {
		(async () => {
			await getCategoryAll();
		})();
	}, []);

	useEffect(() => {
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

	const handleForm = (e: any) => {
		if (e.target.name === 'documentNumber') {
			e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g);
		}
		let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
			'(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
		if (e.target.name === 'linkBio') {
			if (!e.target.value.match(urlPattern)) {
				form.formErrors[e.target.name] = true;
				e.target.classList.add('has-error-url');
				e.target.nextSibling.nextSibling.classList.add('has-error-description-url');
			} else {
				form.formErrors[e.target.name] = false;
				e.target.classList.remove('has-error-url');
				e.target.nextSibling.nextSibling.classList.remove('has-error-description-url');
			}
		}
		else if (e.target.name === 'documentType' && e.target.value === '_none') {
			form.formErrors[e.target.name] = true;
		} else if(e.target.value !== '_none'){
			form.formErrors[e.target.name] = false;
		}

		else if (e.target.name === 'category' && e.target.value === '_none') {
			form.formErrors[e.target.name] = true;
		} else if(e.target.value !== '_none'){
			form.formErrors[e.target.name] = false;
		}

		else if (e.target.name === 'typeBio' && e.target.value === '_none') {
			form.formErrors[e.target.name] = true;
		} else if(e.target.value !== '_none'){
			form.formErrors[e.target.name] = false;
		}


		if (e.target.value == '' && !e.target.classList.contains('has-error')) {
			form.formErrors[e.target.name] = true;
			e.target.classList.add('has-error');
			e.target.nextSibling.classList.add('has-error-description');
			e.target.nextSibling.nextSibling.classList.remove('has-error-description-url');
		} else if (e.target.value !== '' && e.target.hasOwnProperty('value')) {
			form.formErrors[e.target.name] = false;
			e.target.classList.remove('has-error');
			e.target.nextSibling.classList.remove('has-error-description');
		}

		setForm({
			...form,
			[e.target.name]: e.target.value,
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

		if (Object.entries(form.formErrors).map( ([key, val]) => val).every(element => element === false) && Object.entries(form.formErrors).length == 8) {
			const response = await register(dataSend);

			switch (response.data.message) {
				case CREATE_USER:
					clearOneLocalStorage(TEM_USER);
					reset();
					toast.success('Se creó el usuario correctamente.');
					setTimeout(() => {
						setLoading(false);
						navigate('/login', { replace: true });
					}, 2000);
					return;
				case USER_EXISTING:
					toast.error('El usuario ya existe.');
					// alert('el usuario ya existe');
					return;
				default:
					toast.error('Error en el servidor.');
					// alert('Error corregir esto :c');
					break;
			}
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
		console.log('items selected',newData);
		verifiedSelected(newData);
		
	};
	
	const verifiedSelected = (e) => {
		let ob = e.filter( option => option.select === true);
		return ob
	}
	console.log('esta selecionado:',verifiedSelected)
	
	return (
		<React.Fragment>
			{}
			<Header />
			<Toaster position="top-right" reverseOrder={false} />
			<form>
				<section className="applyJob">
					<aside className="coverHeader mb-5"></aside>
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
												<DropdownItem value="_none">Elige el tipo de documento</DropdownItem>
												<DropdownItem value="1">RUC</DropdownItem>
												<DropdownItem value="2">DNI</DropdownItem>
												<DropdownItem value="3">Carnet de Extranjeria</DropdownItem>
											</DropdownMenu>
											<Txtfield className="ml-5" placeholder="Nro de documento" name="documentNumber" onChange={handleForm} value={form.documentNumber} />
											<Span className="error-required-field-description">* Por favor ingresa tu número de documento.</Span>
										</aside>
									</article>
									<article className="footerSection">
										<BtnPrimary type="button" onClick={handleNextTab} className={`button-primary ${Object.entries(form.formErrors).map( ([key, val]) => val).every(element => element === false) && Object.entries(form.formErrors).length == 2 ? 'test' : 'disabled'}`}>
											{' '}
											Siguiente{' '}
										</BtnPrimary>
									</article>
								</section>
							</TabPanel>
							<TabPanel tabIndex={1}>
								<section className="formApply pt-5">
									<article>
										<p className="mb-3">Elige tu especialidad: </p>
										<aside className="FormGroup">
											<DropdownMenu onChange={handleForm} name="category" value={form.category} >
												<DropdownItem value="_none">Elija su especialidad</DropdownItem>

												{categorys.map((category: Category) => (
													<DropdownItem key={category._id} value={category._id}>
														{category.nameCategory}
													</DropdownItem>
												))}
											</DropdownMenu>
										</aside>
									</article>
									<p>Elige los skills que mejor manejes. </p>
									<article className="gridBox mt-4">
		
										{skills.map((e: SkillSelect) => (
											<OptionComponent type="selectable" key={e._id} tag={e} select={e.select} eventS={(e: SkillSelect) => selectItemSkill(e)} />
										))}
									</article>
									<article className="footerSection">
										
											
										
											<BtnPrimary type="button" onClick={handleNextTab} className={`button-primary ${Object.entries(form.formErrors).map( ([key, val]) => val).every(element => element === false) && Object.entries(form.formErrors).length == 3 ? 'test' : 'disabled'}`} >
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
												<DropdownItem value="_none">Seleccione tipo de enlace </DropdownItem>
												<DropdownItem value="1">Linkedin</DropdownItem>
												<DropdownItem value="2">Web</DropdownItem>
											</DropdownMenu>
											<Txtfield className="ml-5" type={'url'} placeholder="Ingrese enlace" onChange={handleForm} name="linkBio" value={form.linkBio} />
											<Span className="error-required-field-description">* Por favor ingresa tu enlace. </Span>
											<Span className="error-required-field-description">* Por favor ingresa el formato correcto. </Span>
										</aside>
									</article>
									<article className="mb-5">
										<p className="text-center mb-3">ó , coloca tu experiencia respecto al puesto que buscamos</p>
										<aside className="FormGroup">
											<Txtfield className="mr-5" placeholder="Proyecto" onChange={handleForm} name="project" value={form.project} />
											<Span className="error-required-field-description">* Por favor ingresa tu proyecto. </Span>
											<Txtfield className="" placeholder="Tiempo de trabajo" onChange={handleForm} name="timeProject" value={form.timeProject} />
											<Span className="error-required-field-description">* Por favor ingresa tu tiempo de trabajo. </Span>
										</aside>
										<aside className="FormGroup">
											<Txtfield placeholder="Funciones que realizaste" onChange={handleForm} name="functions" value={form.functions} />
											<Span className="error-required-field-description">* Por favor ingresa las funciones que realizaste. </Span>
										</aside>
									</article>
									<article className="footerSection">
										{/* <BtnPrimary family="submit"> Registrar </BtnPrimary> */}
										<BtnPrimary disabled={loading} onClick={handleRegister2} className={`button-primary ${Object.entries(form.formErrors).map( ([key, val]) => val).every(element => element === false) && Object.entries(form.formErrors).length == 8 ? 'test' : 'disabled'}`}>
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
