import React from 'react';
import './../../sass/shared/_header.scss';
import NavbarComponent from './NavbarComponent';
import { SESSION } from './../../helpers/constants';
import { getLocalStorage } from '../../helpers/localStorage';

const navNoUser = {
	brand: { name: 'ChambeaYa.', to: '/' },
	links: [
		{ name: 'Buscar un empleo', to: '/searchjob' },
		{ name: 'Contacto', to: '/contact' },
		{ name: 'Iniciar sesión', to: '/login' },
		{ name: 'Registrarme', to: '/register' },
	],
};

const navUser = {
	brand: { name: 'ChambeaYa.', to: '/' },
	links: [
		{ name: 'Buscar un empleo', to: '/searchjob' },
		{ name: 'Contacto', to: '/contact' },
		{ name: 'Mi perfil', to: '/myaccount' },
	],
};

export default function Header() {
	// const sesionLog = localStorage.getItem(SESSION);
	const sesionLog = getLocalStorage(SESSION);
	const { brand, links } = sesionLog === null ? navNoUser : navUser;

	return (
		<React.Fragment>
			<header>
				<NavbarComponent brand={brand} links={links} />
			</header>
		</React.Fragment>
	);
}
