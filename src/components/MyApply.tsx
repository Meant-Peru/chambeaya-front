// import * as React from "react";
import React, { useEffect, useState } from 'react';
import check from './../assets/check.svg';
import negative from './../assets/negative.svg';

import Modal from 'react-modal';
import { usePostulant } from '../hooks/usePostulant';
import { PostJob } from '../types/post_job';

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
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [listPostulations, setListPostulations] = useState([]);
	const { startListPostulations } = usePostulant();

	useEffect(() => {
		handleListPostulations();
	}, []);

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

	const handleListPostulations = async () => {
		const data = await startListPostulations();
		setListPostulations([...data]);
	};

	return (
		<React.Fragment>
			<section>
				<p>Historial</p>
				<aside className="listCards">
					{listPostulations.map((p: PostJob) => (
						<article className="cardHistory" key={p._id}>
							<div className="headCard">
								<strong>{p.title}</strong>
								<span>CSTI CORP</span>
							</div>
							<div className="contentCard">
								<ul className="listCard">
									<li>
										<img src={check} alt="" /> <span>Skills</span>
									</li>
									<li>
										<img src={negative} alt="" /> <span>Presupuesto</span>
									</li>
									<li>
										<img src={check} alt="" /> <span>Experiencia</span>
									</li>
								</ul>
								<button className="btnComponent--textLink" onClick={openModal}>
									{' '}
									Ver Detalle{' '}
								</button>

								<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
									<button onClick={closeModal}>close</button>

									<h2>Soy un modal</h2>
								</Modal>
							</div>
						</article>
					))}
				</aside>
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
