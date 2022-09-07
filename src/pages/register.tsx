import * as React from 'react';
import CheckButton from '../components/shared/atom/checkButton';
import { CREATE_USER, TEM_USER, USER_EXISTING } from './../helpers/constants';

import Header from '../components/shared/header';
import {Txtfield, BtnPrimary, Span} from './../components/shared/styled';
import './../sass/pages/_register.scss';
import { register } from './../util/auth.service';
import { useNavigate } from 'react-router-dom';

import { POSTULANT } from './../helpers/constants';
import { saveLocalStorage } from '../helpers/localStorage';

export default function Register() {
	const navigate = useNavigate();
	const [account, setAccount] = React.useState({
		email: '',
		password: '',
		name: '',
		lastName: '',
		phone: '',
		rolUser: POSTULANT,
		sex: 'H',
		birthDayDate: new Date(),
		formErrors: [],
	});

	const handleRegister = async (e: any) => {

		const dataSend = {
			email: account.email,
			password: account.password,
			rol: account.rolUser,
			dataUser: {
				email: account.email,
				rol: account.rolUser,
				name: account.name,
				lastName: account.lastName,
				dni: 11113,
				phone: account.phone,
				genere: '',
				brithdayDate: account.birthDayDate,
			},
		};
		if (Object.entries(account.formErrors).map( ([key, val]) => val).every(element => element === false) && Object.entries(account.formErrors).length == 7) {
			navigate('/register-step-2', { replace: true });
		}

		saveLocalStorage(TEM_USER, dataSend);

		// const response = await register(dataSend);

		// switch (response.data.message) {
		// 	case CREATE_USER:
		// 		// navigate('/login', { replace: true });
		// 		navigate('/register-step-2', { replace: true });
		// 		return;
		// 	case USER_EXISTING:
		// 		alert('el usuario ya existe');
		// 		return;
		// 	default:
		// 		alert('Error corregir esto :c');
		// 		break;
		// }
	};


	const handleEvent = (e: any) => {
		// Replaces fields to correct input data.
		if (e.target.name === 'name') {
			// Only allow letter alphabetical from a-z.
			e.target.value = e.target.value.replace(/[^a-z]/gi, '');
		}
		if (e.target.name === 'lastName') {
			e.target.value = e.target.value.replace(/[^a-z]/gi, '');
		}
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
		if (e.target.name === 'phone') {
			e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g);
		}

		// Validate emptiness for textfield.
		if (e.target.hasOwnProperty('value') && e.target.value == '' && !e.target.classList.contains('has-error')) {
			account.formErrors[e.target.name] = true;
			e.target.classList.add('has-error');
			e.target.nextSibling.classList.add('has-error-description');
			if (e.target.classList.contains('has-error-email')) {
				e.target.nextSibling.nextSibling.classList.remove('has-error-description-email');
			}
		}

		// ..
		if (e.target.name === 'confirmPassword') {
			console.log(e.target.value);
			console.log(account.password);
			if (e.target.value != account.password) {
				account.formErrors[e.target.name] = true;
				e.target.classList.add('has-error');
				e.target.nextSibling.classList.add('has-error-description');
			} else if (e.target.value == account.password){
				account.formErrors[e.target.name] = false;
				e.target.classList.remove('has-error');
				e.target.nextSibling.classList.remove('has-error-description');
			}
		}

		// Validate emptiness for textfield when NOT empty.
		else if (e.target.hasOwnProperty('value') && e.target.value !== '') {
			account.formErrors[e.target.name] = false;
			e.target.classList.remove('has-error');
			e.target.nextSibling.classList.remove('has-error-description');
		}

		if (e.target.hasOwnProperty('checked') && e.target.checked == true) {
			//account.countFormErrors--;
			account.formErrors[e.target.name] = false;
			e.target.classList.remove('has-error');
			e.target.parentElement.nextSibling.classList.add('error-required-field-description');
		}
		else if (e.target.hasOwnProperty('checked') && e.target.checked == false)  {
			//account.countFormErrors++;
			account.formErrors[e.target.name] = true;
			e.target.parentElement.nextSibling.classList.remove('error-required-field-description');
		}

		console.log(account);


		setAccount({
			...account,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<React.Fragment>
			<Header />
			<section className="RegisterPage pt-2">
				<div className="d-flex flex-row formSection align-items-center">
					<h2>Registro de nuevo postulante</h2>
				</div>
				<form className="d-flex flex-col formSection ">
					<div className="d-flex flex-row mb-2">
						<aside className="FormGroup mt-5">
							<Txtfield className="mb-2" onChange={handleEvent} name="name" placeholder="Nombres" required/>
							<Span className="error-required-field-description">* Por favor ingresa tu nombre.</Span>
						</aside>
						<aside className="FormGroup mt-5">
							<Txtfield className="mb-2" onChange={handleEvent} name="lastName" placeholder="Apellidos" required/>
							<Span className="error-required-field-description"> * Por favor ingresa tu apellido. </Span>
						</aside>
					</div>

					<div className="d-flex flex-row mb-2">
						<aside className="FormGroup">
							<Txtfield type={'email'} onChange={handleEvent} name="email" className="mb-2" placeholder="Correo electrónico" required/>
							<Span className="error-required-field-description">* Por favor ingresa tu correo. </Span>
							<Span className="error-required-field-description">* Por favor ingresa el formato correcto. </Span>
						</aside>
						<aside className="FormGroup">
							<Txtfield type={'tel'} onChange={handleEvent} name="phone" className="mb-2" placeholder="Teléfono / Celular" required/>
							<Span className="error-required-field-description">* Por favor ingresa tu telefono. </Span>
						</aside>
					</div>

					<div className="d-flex flex-row">
						<aside className="FormGroup">
							<Txtfield className="mb-3" onChange={handleEvent} name="password" type={'password'} placeholder="Clave" />
							<Span className="error-required-field-description">* Por favor ingresa la clave. </Span>
						</aside>
						<aside className="FormGroup">
							<Txtfield className="mb-2" onChange={handleEvent} name="confirmPassword" type={'password'} placeholder="Repetir clave" />
							<Span className="error-required-field-description">* La clave es diferente. </Span>
						</aside>
					</div>
					<aside className="d-flex flex-col mt-4">
						<CheckButton onChange={handleEvent} withbg="no" label="Acepto los Términos y Condiciones"/>
						<Span className="has-error-description">* Ingresa a este enlace para ver los <a href="example.html">términos y condiciones.</a> </Span>
					</aside>
				</form>


				<aside className="FormAction mt-5">
					{/* Check if all form elements DO NOT have any errors */}
					{/* And check if there are 7 form elements in the current form. */}
					<BtnPrimary onClick={handleRegister} className={`button-primary ${Object.entries(account.formErrors).map( ([key, val]) => val).every(element => element === false) && Object.entries(account.formErrors).length == 7 ? 'test' : 'disabled'}`} >CREAR CUENTA</BtnPrimary>
					<p className="mt-2">
						<a href="/login">¿Ya tienes una cuenta?</a>
					</p>
				</aside>
			</section>
		</React.Fragment>
	);
}

