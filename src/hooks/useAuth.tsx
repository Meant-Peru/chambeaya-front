import { useDispatch } from 'react-redux';
import { POSTULANT, SESSION, USER_OR_PASSWORD_NOT_EXISTING } from '../helpers/constants';
import { auth } from '../util/auth.service';

import { useNavigate } from 'react-router-dom';
import { signIn } from '../redux/slices/authSlice';
import { GetUser } from '../util/user.service';
import { PostulantInterface, CompanyDetailInterface } from '../interfaces/User';

export const useAuth = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const startLogin = async (user: any) => {
		const response = await auth(user);
		if (response.status === 200 && response.data.message !== USER_OR_PASSWORD_NOT_EXISTING) {
			const starUser = await validateToken(response.data.data.token);
			if (starUser) navigate('/myaccount');
		} else {
			alert('No encontrado');
		}
	};

	const validateToken = async (token: string) => {
		try {
			const { data } = await GetUser(token);
			if (data?.rol === POSTULANT) {
				const user: PostulantInterface = { ...data.dataUser, rol: data.rol, email: data.email };
				const paylod = { token: token, user };
				dispatch(signIn(paylod));
			} else {
				const user: CompanyDetailInterface = { ...data.dataUser, rol: data.rol, email: data.email };
				const paylod = { token: token, user };
				dispatch(signIn(paylod));
			}
			localStorage.setItem(SESSION, token);
			return true;
		} catch (error) {
			return false;
		}
	};

	return {
		startLogin,
		validateToken,
	};
};
