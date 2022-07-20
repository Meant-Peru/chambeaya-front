import React, { Fragment, useEffect, useState } from 'react';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import './../sass/pages/_detailProject.scss';
import time from './../assets/time.svg';

import yape from './../assets/yape.png';
import plin from './../assets/plin.png';
import ButtonComponent from '../components/shared/atom/button';

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

export const DetailProject = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}
    function openModal2() {
		setIsOpen2(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//   subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
        setIsOpen2(false)
	}


    return (
        <React.Fragment>
            <Header />
            <section className="detailProject">
                <p>Detalle de Proyecto</p><br />
                <h2 className='accent-color'>Senior Product Designer</h2>
                <hr />
                <aside className='mt-5'>
                    <h4>Perfil contratado</h4>
                    <p>El perfil fue elegido por afinidad a su requerimiento y validado para el desarrollo de su proyecto</p>
                </aside>
                <aside className='card mt-3'>
                    <strong className='mb-1'>Jose Sanchez XXX</strong>
                    <i>Desarrollador</i>
                </aside>
                <aside className='mt-3'>
                    <h4 className='mb-2'>Pagos y comprobantes</h4>
                    <article className='mmlist mb-1'>
                        <div>
                            <img src={time} width="20" alt="" /> 
                            <span>Presupuesto por el proyecto aún no depositado.</span> 
                        </div>
                        <ButtonComponent
                            link={"/"}
                            family="terceary"
                            icon='whitOutIcon'
                            label="Ver documentos"
                        />
                    </article>
                    <article className='mmlist mb-1'>
                        <div>
                            <img src={time} width="20" alt="" /> 
                            <span>Comprobantes emitidos por el contratado</span>    
                        </div>
                        <ButtonComponent
                            link={"/"}
                            family="terceary"
                            icon='whitOutIcon'
                            label="Ver documentos"
                        />
                    </article>

                    <h4 className='mt-5'>Presupuesto de proyecto</h4>
                    <p>Se requiere el pago del proyecto para iniciar kick-off</p>
                    <article>
                        <div className='headerTab mt-3'>
                            Modo de pagos
                        </div>
                        <div className='row mpago'>
                            <span className='row mlist'>Pago por Yape o Plin <button className="btnComponent--textLink" onClick={openModal}>Ver datos</button></span>
                            <ButtonComponent
                            link={"/"}
                            family="terceary"
                            icon='whitIcon'
                            label="Subir comprobante"
                        />
                        </div>
                        <div className='row mpago'>
                        <span className='row mlist'>Transferencia Bancaria <button className="btnComponent--textLink" onClick={openModal2}>Ver datos</button></span>
                            <ButtonComponent
                            link={"/"}
                            family="terceary"
                            icon='whitIcon'
                            label="Subir comprobante"
                        />
                        </div>
                    </article>

                    <h4 className='mt-5'>Proyecto en curso</h4>
                    <p>Se ha establecido un cronograma de trabajo para constatar el estatus del proyecto.</p>
                    <article className='mt-4'>
                    <ButtonComponent
                            link={"/"}
                            family="secondary"
                            icon='whitOutIcon'
                            label="CRONOGRAMA DE TRABAJO"
                        />
               
                    </article>
                    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
                        {/* <button onClick={closeModal}>close</button> */}
                        <section className='containerModal'>
                            <aside className="headModal">
                                <h2>Pagar con monederos</h2>
                              
                            </aside>
                            <aside className="contentModal">
                                <p>Recuerde que puede hacer pagos en 1 o más transacciones</p>
                                <strong>Titular: Chambea Ya S.A.C</strong>
                                <article className='mt-4'>
                                    <img src={yape} alt="" />
                                    <img src={plin} alt="" />
                                </article>
                            </aside>
                            <button className='btnComponent--primary' onClick={closeModal}>Listo</button>

                        </section>

                    </Modal>

                    <Modal isOpen={modalIsOpen2} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
                        {/* <button onClick={closeModal}>close</button> */}
                        <section className='containerModal'>
                            <aside className="headModal">
                                <h2>Transferencia Bancaria</h2>
                              
                            </aside>
                            <aside className="contentModal">
                                <p>Recuerde que puede hacer pagos en 1 o más transacciones</p>
                                <strong>Titular: Chambea Ya S.A.C</strong>
                                <article className='col mt-4 mb-2'>
                                    <ul>
                                        <li>BCP: 192-232323-2321</li>
                                        <li>BBVA: 34-24323231</li>
                                        <li>INTERBANK: 92-24323231</li>
                                    </ul>
                                </article>
                            </aside>
                            <button className='btnComponent--primary' onClick={closeModal}>Listo</button>

                        </section>

                    </Modal>
                </aside>
            </section>
            <Footer />
        </React.Fragment>
    )
}