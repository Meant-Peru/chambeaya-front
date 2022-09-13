import { useDispatch } from 'react-redux';
import { ADMIN, COMPANY, LOGIN_SUCCESS, POSTULANT, SALES, SESSION, UPDATE_SUCCESS, USER, USER_OR_PASSWORD_NOT_EXISTING } from '../helpers/constants';
import { auth } from '../util/auth.service';

import { useNavigate } from 'react-router-dom';
import { signIn, logout } from '../redux/slices/authSlice';
import { GetUser, UpdateUser } from '../util/user.service';
import { UserGenerico } from '../interfaces/User';
import { clearLocalStorage, saveLocalStorage } from '../helpers/localStorage';

export const useAuth = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const startLogin = async (user: any) => {
		const response = await auth(user);
		console.log({ response });
		switch (response.data.message) {
			case LOGIN_SUCCESS:
				const { status, user: userGenerico } = await validateToken(response.data.data.token);

				if (status) {
					switch (userGenerico.rol) {
						case POSTULANT:
						case COMPANY:
							navigate('/myaccount/0', { replace: true });
							return;
						case SALES:
							navigate('/account-sales', { replace: true });
							return;
						case ADMIN:
							navigate('/dashboard', { replace: true });
							return;
						default:
							return;
					}
				}
				return;
			case USER_OR_PASSWORD_NOT_EXISTING:
				alert('No encontrado');
				return;
			default:
				alert('ERROR SERVIDOR');
				return;
		}
	};

	const validateToken = async (token: string) => {
		try {
			const { data } = await GetUser(token);
			console.log('data validateToken', data);
			const user: UserGenerico = { dataUser: data.dataUser, rol: data.rol };
			const paylod = { token: token, user };
			dispatch(signIn(paylod));
			saveLocalStorage(SESSION, token);
			saveLocalStorage(USER, user);
			return { status: true, user };
		} catch (error) {
			console.log('[validateToken]', { error });
			return { status: false, user: { rol: '' } };
		}
	};

	const startLogout = () => {
		clearLocalStorage();
		dispatch(logout());
		navigate('/login', { replace: true });
	};

	const startUpdateUser = async (data: any) => {
		const resp = await UpdateUser(data);
		if (resp.message === UPDATE_SUCCESS) {
			const { data } = resp;
			// console.log({ data });
			const user: UserGenerico = { dataUser: data.dataUser, rol: data.dataUser.rol, id: data.id };
			saveLocalStorage(USER, user);
			alert('Se actualizó correctamente...');
		} else {
			alert('ERROR UPDATE');
		}
		return resp;
	};

	return {
		startLogin,
		validateToken,
		startLogout,
		startUpdateUser,
	};
};
