import { createStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from '../slices/authSlice';
import salesSlice from '../slices/salesSlice';
import uiSlice from '../slices/uiSlice';

const rootReducer = combineReducers({
	auth: authSlice,
	sales: salesSlice,
	ui: uiSlice,
});

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export type RootState = ReturnType<typeof rootReducer>;
