import * as React from 'react';

import Header from '../components/shared/header';
import { SESSION, USER_OR_PASSWORD_NOT_EXISTING } from './../helpers/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { Txtfield, BtnPrimary } from './../components/shared/styled';
import Modal from 'react-modal';

import './../sass/pages/_login.scss';

import { useAuth } from '../hooks/useAuth';
import {useEffect, useState} from "react";
import {usePostulant} from "../hooks/usePostulant";

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

export default function Login() {

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

	const navigate = useNavigate();
	const [user, setUser] = React.useState({ email: '', password: '' });

	const { startLogin } = useAuth();

	const handleRedirect = async () => await startLogin(user);

	const handleEvent = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<React.Fragment>
			<Header />
			<section className="LoginPage pt-2">
				<h2>Ingresar a la plataforma</h2>
				<aside className="FormGroup mt-5">
					<Txtfield onChange={handleEvent} name="email" className="mb-3" placeholder="Usuario" />
					<Txtfield onChange={handleEvent} name="password" className="mb-2" type={'password'} placeholder="Contraseña" />
				</aside>
				<aside className="FormGroup">
					<p>
						{' '}
						<a onClick={openModal}>Olvide mi clave</a>{' '}
					</p>
				</aside>
				<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
					<button onClick={closeModal}>close</button>

					<h2>Soy un modal</h2>
				</Modal>
				<aside className="FormAction mt-5">
					<BtnPrimary onClick={handleRedirect}>Login</BtnPrimary>
					<p className="mt-2">
						<a href="/register">¿No tienes una cuenta?</a>
					</p>
				</aside>
			</section>
		</React.Fragment>
	);
}
