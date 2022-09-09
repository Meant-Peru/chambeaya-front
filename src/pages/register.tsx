import * as React from 'react';
import CheckButton from '../components/shared/atom/checkButton';
import { CREATE_USER, TEM_USER, USER_EXISTING } from './../helpers/constants';

import Header from '../components/shared/header';
import { Txtfield, BtnPrimary } from './../components/shared/styled';
import './../sass/pages/_register.scss';
import { register } from './../util/auth.service';
import { useNavigate } from 'react-router-dom';

import { POSTULANT } from './../helpers/constants';
import { saveLocalStorage } from '../helpers/localStorage';

import toast, { Toaster } from 'react-hot-toast';

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
	});

	const handleRegister = async () => {
		
		let passed = true;

		if (account.email === '')  {
			toast.error('El email es obligatorio.');
			passed = false;

    		//Se muestra un texto a modo de ejemplo, luego va a ser un icono
    		if (account.email !== null && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(account.email)) {
				toast.error('El email ingresado no es válido.');
			    passed = false;
			}
		}

		if (account.name === null || account.name.length === 0 )  {
			toast.error('El nombre es obligatorio.');
			passed = false;

    		//Se muestra un texto a modo de ejemplo, luego va a ser un icono
    		if (account.name !== null && /^\s+$/.test(account.name)) {
				toast.error('El nombre ingresado no es válido.');
			    passed = false;
			}
		}

		if (account.lastName === null || account.lastName.length === 0 )  {
			toast.error('Los apellidos son obligatorios.');
			passed = false;

    		//Se muestra un texto a modo de ejemplo, luego va a ser un icono
    		if (account.lastName !== null && /^\s+$/.test(account.lastName)) {
				toast.error('Los apellidos ingresados no son válidos.');
			passed = false;
			}
		}

		if (account.phone === null || account.phone.length === 0 )  {
			toast.error('El número de celular es obligatorio.');
			passed = false;

    		//Se muestra un texto a modo de ejemplo, luego va a ser un icono
    		if (account.phone !== null || account.phone.length !== 0 && !(/^\d{9}$/.test(account.phone))) {
				toast.error('El número de celular ingresado no es válido.');
			    passed = false;
			}
		}

		if (account.password === '')  {
			toast.error('El password es obligatorio.');
			passed = false;
		}


		if (passed === true) {

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

			saveLocalStorage(TEM_USER, dataSend);
			navigate('/register-step-2', { replace: true });

		}

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
		setAccount({
			...account,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<React.Fragment>
			<Header />
			<Toaster position="top-center" reverseOrder={false} />
			<section className="RegisterPage pt-2">
				<h2>Registro de nuevo postulante</h2>
				<aside className="FormGroup mt-5">
					<Txtfield className="mb-3" onChange={handleEvent} name="name" placeholder="Nombres" />
					<Txtfield className="mb-2" onChange={handleEvent} name="lastName" placeholder="Apellidos" />
				</aside>
				<aside className="FormGroup">
					<Txtfield type={'email'} onChange={handleEvent} name="email" className="mb-3" placeholder="Correo electrónico" />
					<Txtfield type={'tel'} onChange={handleEvent} name="phone" className="mb-2" placeholder="Teléfono / Celular" />
				</aside>

				<aside className="FormGroup">
					<Txtfield className="mb-3" onChange={handleEvent} name="password" type={'password'} placeholder="Clave" />
					<Txtfield className="mb-2" onChange={handleEvent} name="confirmPassword" type={'password'} placeholder="Repetir clave" />
				</aside>
				<aside className="FormGroupFull">
					<CheckButton withbg="no" name="terminos" label="Acepto los Términos y Condiciones" />
				</aside>
				<aside className="FormAction mt-5">
					<BtnPrimary onClick={handleRegister}>CREAR CUENTA</BtnPrimary>
					<p className="mt-2">
						<a href="/login">¿Ya tienes una cuenta?</a>
					</p>
				</aside>
			</section>
		</React.Fragment>
	);
}
