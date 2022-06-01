import { useDispatch } from 'react-redux';
import { POSTULANT, SESSION, USER_OR_PASSWORD_NOT_EXISTING } from '../helpers/constants';
import { RequestLogin } from '../interfaces/Auth';
import { auth } from '../util/auth.service';

import { useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../redux/slices/authSlice';
import { GetUser } from '../util/user.service';
import User from '../interfaces/User';
import { PostulantInterface, CompanyDetailInterface } from '../interfaces/User';

export const useAuth = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const startLogin = async (user: RequestLogin) => {
		const response = await auth(user);
		console.log({ response });

		if (response.status === 200 && response.data.message !== USER_OR_PASSWORD_NOT_EXISTING) {
			localStorage.setItem(SESSION, response.data.data.token);
			const { data } = await GetUser();

			if (data?.rol === POSTULANT) {
				const user: PostulantInterface = { ...data.dataUser, rol: data.rol, email: data.email };
				const paylod = { token: response.data.data.token, user };
				dispatch(signIn(paylod));
			} else {
				const user: CompanyDetailInterface = { ...data.dataUser, rol: data.rol, email: data.email };
				const paylod = { token: response.data.data.token, user };
				dispatch(signIn(paylod));
			}
			navigate('/myaccount');
		} else {
			alert('No encontrado');
		}
	};

	return {
		startLogin,
	};
};
