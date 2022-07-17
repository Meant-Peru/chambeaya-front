import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGenerico } from '../../interfaces/User';
import { CompanySales } from '../../interfaces/CompanySales';

interface SalesState {
	modalIsOpen: boolean;
	loading: boolean;
}

const initialState: SalesState = {
	modalIsOpen: false,
	loading: false,
};

const uiSlice = createSlice({
	name: 'salesSlice',
	initialState,
	reducers: {
		changeModal: (state, { payload }: PayloadAction<any>) => {
			return {
				...state,
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
