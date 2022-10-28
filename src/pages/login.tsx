import * as React from 'react';

import Header from '../components/shared/header';
import { useNavigate } from 'react-router-dom';
import {Txtfield, BtnPrimary, BtnSecondary, Span} from './../components/shared/styled';
import Modal from 'react-modal';

import './../sass/pages/_login.scss';

import { useAuth } from '../hooks/useAuth';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '24px',
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
	const [user, setUser] = React.useState({
		email: '',
		password: '',
		formErrors: []});

	const { startLogin } = useAuth();

	const handleRedirect = async (e: any) => {
		if (Object.entries(user.formErrors).map(([key, val]) => val).every(element => element === false) && Object.entries(user.formErrors).length == 2) {
			await startLogin(user);
		}
	}

	const handleEvent = (e: any) => {
		let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (e.target.name === 'email') {
			if (!e.target.value.match(validRegex)) {
				e.target.classList.add('has-error-email');
				e.target.nextSibling.nextSibling.classList.add('has-error-description-email');
			} else {
				e.target.classList.remove('has-error-email');
				e.target.nextSibling.nextSibling.classList.remove('has-error-description-email');
			}
		}

		if (e.target.value == '' && !e.target.classList.contains('has-error')) {
			user.formErrors[e.target.name] = true;
			e.target.classList.add('has-error');
			e.target.nextSibling.classList.add('has-error-description');
			if (e.target.classList.contains('has-error-email')) {
				e.target.nextSibling.nextSibling.classList.remove('has-error-description-email');
			}
		} else if (e.target.value !== '' && e.target.hasOwnProperty('value')) {
			user.formErrors[e.target.name] = false;
			e.target.classList.remove('has-error');
			e.target.nextSibling.classList.remove('has-error-description');
		}
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
					<Span className="error-required-field-description"> * Por favor ingresa tu usuario. </Span>
					<Span className="error-required-field-description">* Por favor ingresa el formato correcto. </Span>
					<Txtfield onChange={handleEvent} name="password" className="mb-2" type={'password'} placeholder="Contraseña" />
					<Span className="error-required-field-description"> * Por favor ingresa tu contraseña. </Span>
				</aside>
				<aside className="FormGroup">
					<p>
						{' '}
						<a href="#" onClick={openModal}>Olvide mi clave</a>{' '}
					</p>
				</aside>
				<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" overlayClassName="Overlay">
					{/* <button onClick={closeModal}>close</button> */}
			
					<h3>Olvide mi clave</h3>
					<p className='mt-2 mb-2'>Para recuperar tu cuenta debes contactarte <br />
						con la siguiente direcció de correo electrónico <br /> para recibir asistencia: <br/><br/>
						<a target={"_blank"} href="mailto:hola@chambea-latam.com">hola@chambea-latam.com</a> </p>
					<BtnSecondary onClick={closeModal}>Cerrar</BtnSecondary>
				
				</Modal>
				<aside className="FormAction mt-5">
					<BtnPrimary onClick={handleRedirect} className={`button-primary ${Object.entries(user.formErrors).map( ([key, val]) => val).every(element => element === false) && Object.entries(user.formErrors).length == 2 ? 'test' : 'disabled'}`}>Login</BtnPrimary>
					<p className="mt-2">
						<a href="/register">¿No tienes una cuenta?</a>
					</p>
				</aside>
			</section>
		</React.Fragment>
	);
}
