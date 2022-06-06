import { createStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from '../slices/authSlice';
import salesSlice from '../slices/salesSlice';

const rootReducer = combineReducers({
	auth: authSlice,
	sales: salesSlice,
});

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export type RootState = ReturnType<typeof rootReducer>;
