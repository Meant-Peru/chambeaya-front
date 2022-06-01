import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	loadingLogin: boolean;
	status: 'checking' | 'authenticated' | 'not-authenticated';
	token: string | null;
	errorMessage: string | null;
	user: any;
}

const initialState: AuthState = {
	loadingLogin: false,
	status: 'checking',
	token: null,
	errorMessage: '',
	user: null,
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
				user: null,
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
				user: null,
				loadingLogin: false,
			};
		},
		logout: (state) => {
			return {
				...state,
				status: 'not-authenticated',
				token: null,
				user: null,
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
