// import * as React from "react";
import React, { useEffect, useState } from 'react';
import check from './../assets/check.svg';
import negative from './../assets/negative.svg';

import { usePostulant } from '../hooks/usePostulant';
import { getSkill } from '../util/skill.service';

import { PostJobPostulant } from '../types/post_job';
import { ModalComponent } from './ModalComponent';
import { useUi } from '../hooks/useUi';
import { TagComponent } from './shared/atom/tag';

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

export const MyApply = () => {

	const [loading, setLoading] = useState(true);
	const [listPostulations, setListPostulations] = useState([]);
	const [skill, setSkill] = useState([]);
	
	const { startListPostulations } = usePostulant();
	const { changeStateModal } = useUi();
	

	const handleListPostulations = async () => {
		setLoading(true)
		const data = await startListPostulations();
		console.log('lista de postulaciones', data);
		setListPostulations([...data]);
		setLoading(false)
	};
	const getSkills = async () => {
		const responseSkill = await getSkill();
			setSkill(responseSkill.data.data);
	}
	

	useEffect(() => {
		getSkills();
		handleListPostulations();
		
	}, []);


	if(loading){
		return <div>Consultando tus postulaciones...</div>
	}

	return (
		<React.Fragment>
			<section>

				{listPostulations.length === 0 &&
					<div>
						<p>No hay postulaciones</p>
					</div>
				}
				{listPostulations.length > 0 &&
					<div>
						<p>Historial</p>
						<aside className="listCards">
							{listPostulations!.map((p: PostJobPostulant) => (
								<article className="cardHistory" key={p?._id}>
									<div className="headCard">
										<strong>{p?.title}</strong>
										<span>{p?.state === true ? 'Publicación Abierta' : 'Publicación Cerrada'}</span>
									</div>
									<div className="contentCard">
										<ul className="listCard">
											<li>
												<img src={p?.porcentageSkills === 100 ? check : negative} alt="" /> <span>Skills</span>
											</li>
											<li>
												<img src={p?.stateSalary ? check : negative} alt="" /> <span>Presupuesto</span>
											</li>
											<li>
												<img src={p?.stateExperience ? check : negative} alt="" /> <span>Experiencia</span>
											</li>
										</ul>
										<button className="btnComponent--textLink" onClick={() => changeStateModal(true) }>
											{' '}
											Ver Detalle{' '}
										</button>

										<ModalComponent>
											<aside className="mt-2 mr-5 ml-5 mb-2">
												<h2 className="text-center">Contrato del postulante</h2>
												<p className="text-center">
													<i>Nuestra plataforma detecto % de similitud del postulante con su requerimiento.</i>
												</p>
												<hr className="mt-2" />
												<aside className="algn-left">
													<p className="mt-2">
														<i>Resumen de postulación.</i>
													</p>
													<ul className="listMoldal">
														<li className="">
															<img src={p?.porcentageSkills === 100 ? check : negative} alt="" /> <span>Tus skills tienen el {p?.porcentageSkills}% de similitud del postulante con el puesto.</span>
															<div className="mt-1">
																
																{/* <TagComponent key={1} type="state" level="success" tag={{ nameSkill: 'aa' }} />
																<article className="skillsBox">
													{skillSelected.map((e: Skill) => (
														<TagComponent key={e._id} tag={e} event={(e: any) => removeItemSkill(e)} />
													))}
												</article> */}
															</div>
														</li>
														<li>
															<img src={p?.stateSalary ? check : negative} alt="" /> <span>Tu presupuesto ésta {p?.stateSalary ? 'dentro' : 'fuera'} del rango.</span>
															<p>El rango presupuesto del cliente es de {p?.salaryRange}. </p>
														</li>
														<li>
															
															<img src={p?.stateExperience ? check : negative}  alt="" /> <span>Años de experiencia para este puesto.</span>
														
														</li>
													</ul>
												</aside>
												
											</aside>
										</ModalComponent>
										
									</div>
								</article>
							))}
						</aside>
					</div>
				}
			</section>
		</React.Fragment>
	);
};

// export default function MyApply() {
//     const [modalIsOpen, setIsOpen] = React.useState(false);
//     const [listPostulations, setListPostulations] = useState([]);

//     function openModal() {
//         setIsOpen(true);
//     }

//     function afterOpenModal() {
//         // references are now sync'd and can be accessed.
//         //   subtitle.style.color = '#f00';
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }
//     return (
//         <React.Fragment>
//             <section>
//                 <p>Historial</p>
//                 <aside className="listCards">
//                     <article className="cardHistory">
//                         <div className="headCard">
//                             <strong> UX Designer</strong>
//                             <span>CSTI CORP</span>
//                         </div>
//                         <div className="contentCard">
//                             <ul className="listCard">
//                                 <li>
//                                     <img src={check} alt="" /> <span>Skills</span>
//                                 </li>
//                                 <li>
//                                     <img src={negative} alt="" /> <span>Presupuesto</span>
//                                 </li>
//                                 <li>
//                                     <img src={check} alt="" /> <span>Experiencia</span>
//                                 </li>
//                             </ul>
//                             <button className="btnComponent--textLink" onClick={openModal}>
//                                 {' '}
//                                 Ver Detalle{' '}
//                             </button>

//                             <Modal
//                                 isOpen={modalIsOpen}
//                                 onAfterOpen={afterOpenModal}
//                                 onRequestClose={closeModal}
//                                 style={customStyles}
//                                 contentLabel="Example Modal"
//                                 overlayClassName="Overlay"
//                             >
//                                 <button onClick={closeModal}>close</button>

//                                 <h2>Soy un modal</h2>
//                             </Modal>
//                         </div>
//                     </article>

//                     <article className="cardHistory">
//                         <div className="headCard">
//                             <strong> UX Designer</strong>
//                             <span>CSTI CORP</span>
//                         </div>
//                         <div className="contentCard">
//                             <ul className="listCard">
//                                 <li>
//                                     <img src={check} alt="" /> <span>Skills</span>
//                                 </li>
//                                 <li>
//                                     <img src={negative} alt="" /> <span>Presupuesto</span>
//                                 </li>
//                                 <li>
//                                     <img src={check} alt="" /> <span>Experiencia</span>
//                                 </li>
//                             </ul>
//                             <button className="btnComponent--textLink" onClick={openModal}>
//                                 {' '}
//                                 Ver Detalle{' '}
//                             </button>

//                             <Modal
//                                 isOpen={modalIsOpen}
//                                 onAfterOpen={afterOpenModal}
//                                 onRequestClose={closeModal}
//                                 style={customStyles}
//                                 contentLabel="Example Modal"
//                                 overlayClassName="Overlay"
//                             >
//                                 <button onClick={closeModal}>close</button>

//                                 <h2>Soy un modal</h2>
//                             </Modal>
//                         </div>
//                     </article>

//                     <article className="cardHistory">
//                         <div className="headCard">
//                             <strong> UX Designer</strong>
//                             <span>CSTI CORP</span>
//                         </div>
//                         <div className="contentCard">
//                             <ul className="listCard">
//                                 <li>
//                                     <img src={check} alt="" /> <span>Skills</span>
//                                 </li>
//                                 <li>
//                                     <img src={negative} alt="" /> <span>Presupuesto</span>
//                                 </li>
//                                 <li>
//                                     <img src={check} alt="" /> <span>Experiencia</span>
//                                 </li>
//                             </ul>
//                             <button className="btnComponent--textLink" onClick={openModal}>
//                                 {' '}
//                                 Ver Detalle{' '}
//                             </button>

//                             <Modal
//                                 isOpen={modalIsOpen}
//                                 onAfterOpen={afterOpenModal}
//                                 onRequestClose={closeModal}
//                                 style={customStyles}
//                                 contentLabel="Example Modal"
//                                 overlayClassName="Overlay"
//                             >
//                                 <button onClick={closeModal}>close</button>

//                                 <h2>Soy un modal</h2>
//                             </Modal>
//                         </div>
//                     </article>

//                     <article className="cardHistory">
//                         <div className="headCard">
//                             <strong> UX Designer</strong>
//                             <span>CSTI CORP</span>
//                         </div>
//                         <div className="contentCard">
//                             <ul className="listCard">
//                                 <li>
//                                     <img src={check} alt="" /> <span>Skills</span>
//                                 </li>
//                                 <li>
//                                     <img src={negative} alt="" /> <span>Presupuesto</span>
//                                 </li>
//                                 <li>
//                                     <img src={check} alt="" /> <span>Experiencia</span>
//                                 </li>
//                             </ul>
//                             <button className="btnComponent--textLink" onClick={openModal}>
//                                 {' '}
//                                 Ver Detalle{' '}
//                             </button>

//                             <Modal
//                                 isOpen={modalIsOpen}
//                                 onAfterOpen={afterOpenModal}
//                                 onRequestClose={closeModal}
//                                 style={customStyles}
//                                 contentLabel="Example Modal"
//                                 overlayClassName="Overlay"
//                             >
//                                 <button onClick={closeModal}>close</button>

//                                 <h2>Soy un modal</h2>
//                             </Modal>
//                         </div>
//                     </article>
//                 </aside>
//             </section>
//         </React.Fragment>
//     )
// }
