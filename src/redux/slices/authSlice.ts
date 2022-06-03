import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../helpers/localStorage';
import { USER } from '../../helpers/constants';
import { UserGenerico } from '../../interfaces/User';

interface AuthState {
	loadingLogin: boolean;
	status: 'checking' | 'authenticated' | 'not-authenticated';
	token: string | null;
	errorMessage: string | null;
	user: any;
}

const userNull: UserGenerico = {
	rol: '',
	dataUser: {},
};
const persistedUser = getLocalStorage(USER);

const initialState: AuthState = {
	loadingLogin: false,
	status: 'checking',
	token: null,
	errorMessage: '',
	user: persistedUser,
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		signIn: (state, { payload }: PayloadAction<any>) => {
			return {
				...state,
				errorMessage: '',
				status: 'authenticated',
				token: payload.token,
				user: payload.user,
			};
		},
		addError: (state, action) => {
			return {
				...state,
				user: userNull,
				status: 'not-authenticated',
				token: null,
				errorMessage: action.payload,
				loadingLogin: false,
			};
		},
		removeError: (state) => {
			return {
				...state,
				errorMessage: '',
				loadingLogin: false,
			};
		},
		notAuthenticated: (state) => {
			return {
				...state,
				status: 'not-authenticated',
				token: null,
				user: userNull,
				loadingLogin: false,
			};
		},
		logout: (state) => {
			return {
				...state,
				status: 'not-authenticated',
				token: null,
				user: userNull,
			};
		},
		changeLoginLoading: (state) => {
			return {
				...state,
				loadingLogin: true,
			};
		},
	},
});

export const { signIn, addError, notAuthenticated, removeError, logout, changeLoginLoading } = authSlice.actions;

export default authSlice.reducer;
