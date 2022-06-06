import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGenerico } from '../../interfaces/User';
import { CompanySales } from '../../interfaces/CompanySales';

interface SalesState {
	companies: CompanySales[];
	loading: boolean;
	errorMessage: string;
}

const initialState: SalesState = {
	errorMessage: '',
	loading: false,
	companies: [],
};

const salesSlice = createSlice({
	name: 'salesSlice',
	initialState,
	reducers: {
		loadCompanies: (state, { payload }: PayloadAction<any>) => {
			return {
				...state,
				companies: payload.companies,
				loading: false,
				errorMessage: '',
			};
		},
		changeLoading: (state) => {
			return {
				...state,
				loadingLogin: true,
			};
		},
	},
});

export const { loadCompanies, changeLoading } = salesSlice.actions;

export default salesSlice.reducer;
