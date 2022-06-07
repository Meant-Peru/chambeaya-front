import * as React from 'react';
import CheckButton from '../components/shared/atom/checkButton';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import { BtnPrimary, Txtfield } from '../components/shared/styled';
import './../sass/pages/_corporativo.scss';

import CoverCorporativo from './../assets/coverCorporativo.svg';

import { registerSalesCompany } from '../util/auth.service';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER, USER_EXISTING } from '../helpers/constants';
import { COMPANY } from '../helpers/constants';

export default function BussinessSignUp() {
	const navigate = useNavigate();

	const [companySales, setCompanySales] = React.useState({
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
			email: companySales.email,
			password: companySales.password,
			rol: companySales.rolUser,
			dataUser: {
				email: companySales.email,
				rol: companySales.rolUser,
				ruc: companySales.ruc,
				businessName: companySales.businessName,
				youtube: '',
				web: '',
				phone: companySales.phone,
				facebook: '',
				description: '',
				linkedin: '',
			},
		};
		const response = await registerSalesCompany(dataSend);
		switch (response.data.message) {
			case CREATE_USER:
				alert('se registro exitosamente la empresa');
				navigate('/account-sales', { replace: true });
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
		setCompanySales({
			...companySales,
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
					<h2>Registro de nueva cartera</h2>
					<aside className="FormGroup mt-5">
						<Txtfield className="mb-3" onChange={handleEvent} name="ruc" placeholder="Ruc" />
						<Txtfield className="mb-2" onChange={handleEvent} name="businessName" placeholder="Razón Social" />
					</aside>
					<aside className="FormGroup">
						<Txtfield type={'email'} onChange={handleEvent} name="email" value={companySales.email} className="mb-3" placeholder="Correo electrónico" autoComplete="off" />
						<Txtfield type={'tel'} onChange={handleEvent} name="phone" className="mb-2" placeholder="Teléfono / Celular" />
					</aside>
					<aside className="FormGroup mt-2">
						<Txtfield className="mb-3" onChange={handleEvent} name="password" value={companySales.password} type={'password'} placeholder="Clave" autoComplete="off" />
						<Txtfield className="mb-2" onChange={handleEvent} name="confirmPassword" type={'password'} placeholder="Repetir clave" />
					</aside>

					<aside className="FormAction mt-5">
						<BtnPrimary onClick={handleRegister}>CREAR CARTERA</BtnPrimary>
					</aside>
				</aside>
			</section>
			<Footer />
		</React.Fragment>
	);
}
