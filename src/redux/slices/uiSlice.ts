import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGenerico } from '../../interfaces/User';
import { CompanySales } from '../../interfaces/CompanySales';

interface SalesState {
	modalIsOpen: boolean;
	modalIndentifier: number;
	loading: boolean;
}

const initialState: SalesState = {
	modalIsOpen: false,
	modalIndentifier: 1,
	loading: false,
};

const uiSlice = createSlice({
	name: 'salesSlice',
	initialState,
	reducers: {
		changeModal: (state, { payload }: PayloadAction<any>) => {
			return {
				...state,
				modalIndentifier: payload?.modalIndentifier ?? 1,
				modalIsOpen: payload.modalIsOpen,
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

export const { changeModal, changeLoading } = uiSlice.actions;

export default uiSlice.reducer;
