import * as React from 'react';
import CheckButton from '../components/shared/atom/checkButton';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import { BtnPrimary, Txtfield } from '../components/shared/styled';
import './../sass/pages/_corporativo.scss';

import CoverCorporativo from './../assets/coverCorporativo.svg';

import { register } from './../util/auth.service';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER, USER_EXISTING } from './../helpers/constants';
import { COMPANY } from './../helpers/constants';

export default function Corporativo() {
	const navigate = useNavigate();
	const [account, setAccount] = React.useState({
		businessName: '',
		email: '',
		password: '',
		phone: '',
		description: '',
		ruc: '',
		rolUser: COMPANY,
	});

	const handleRegister = async () => {
		const dataSend = {
			email: account.email,
			password: account.password,
			rol: account.rolUser,
			dataUser: {
				email: account.email,
				rol: account.rolUser,
				ruc: account.ruc,
				businessName: account.businessName,
				youtube: '',
				web: '',
				phone: account.phone,
				facebook: '',
				description: '',
				linkedin: '',
			},
		};

		const response = await register(dataSend);

		switch (response.data.message) {
			case CREATE_USER:
				navigate('/login', { replace: true });
				return;
			case USER_EXISTING:
				alert('el usuario ya existe');
				return;
			default:
				alert('Error corregir esto :c');
				break;
		}
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
			<section className="corporativoPage">
				<aside className="coverSection">
					<img src={CoverCorporativo} alt="" />
					<span>
						Únete a las compañias que buscan <strong>resultados.</strong>
					</span>
				</aside>
				<aside className="formRegister">
					<h2>Registro de nueva compañia</h2>
					<aside className="FormGroup mt-5">
						<Txtfield className="mb-3" onChange={handleEvent} name="ruc" placeholder="Ruc" />
						<Txtfield className="mb-2" onChange={handleEvent} name="businessName" placeholder="Razón Social" />
					</aside>
					<aside className="FormGroup">
						<Txtfield type={'email'} onChange={handleEvent} name="email" value={account.email} className="mb-3" placeholder="Correo electrónico" autoComplete="off" />
						<Txtfield type={'tel'} onChange={handleEvent} name="phone" className="mb-2" placeholder="Teléfono / Celular" />
					</aside>
					<aside className="FormGroup mt-2">
						<Txtfield className="mb-3" onChange={handleEvent} name="password" value={account.password} type={'password'} placeholder="Clave" autoComplete="off" />
						<Txtfield className="mb-2" onChange={handleEvent} name="confirmPassword" type={'password'} placeholder="Repetir clave" />
					</aside>
					<aside className="FormGroupFull">
						<CheckButton withbg="no" label="Acepto los Términos y Condiciones" />
					</aside>
					<aside className="FormAction mt-5">
						<BtnPrimary onClick={handleRegister}>CREAR CUENTA</BtnPrimary>
						<p className="mt-2">
							<a href="/login">Ya tienes una cuenta?</a>
						</p>
					</aside>
				</aside>
			</section>
			<Footer />
		</React.Fragment>
	);
}
