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
		console.log(account);

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
		let result = e.target.value.replace(/[^a-z]/gi, '');
		if (e.target.name === 'name') {
			console.log(e.target.name);
			e.target.value = e.target.value.replace(/[^a-z]/gi, '');
		}
		if (e.target.name === 'lastName') {
			console.log(e.target.name);
			e.target.value = e.target.value.replace(/[^a-z]/gi, '');
		}
		if (e.target.name === 'email') {
			console.log(e.target.name);
			e.target.value = e.target.value.replace(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
		}

		if (e.target.name === 'phone') {
			console.log(e.target.name);
			e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g);
		}

		setAccount({
			...account,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<React.Fragment>
			<Header />
			<section className="RegisterPage pt-2">
				<h2>Registro de nuevo postulante</h2>
				<aside className="FormGroup mt-5">
					<Txtfield className="mb-3" onChange={handleEvent} name="name" placeholder="Nombres" required/>
					<Txtfield className="mb-2" onChange={handleEvent} name="lastName" placeholder="Apellidos" required/>
				</aside>
				<aside className="FormGroup">
					<Txtfield type={'email'} onChange={handleEvent} name="email" className="mb-3" placeholder="Correo electrónico" required/>
					<Txtfield type={'tel'} onChange={handleEvent} name="phone" className="mb-2" placeholder="Teléfono / Celular" required/>
				</aside>

				<aside className="FormGroup">
					<Txtfield className="mb-3" onChange={handleEvent} name="password" type={'password'} placeholder="Clave" />
					<Txtfield className="mb-2" onChange={handleEvent} name="confirmPassword" type={'password'} placeholder="Repetir clave" />
				</aside>
				<aside className="FormGroupFull">
					<CheckButton withbg="no" label="Acepto los Términos y Condiciones" />
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
