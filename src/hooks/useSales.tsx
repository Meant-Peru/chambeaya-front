import React from 'react';
import { useDispatch } from 'react-redux';
import { LIST_SUCCESS } from '../helpers/constants';
import { loadCompanies } from '../redux/slices/salesSlice';
import { getSalesCompanies } from '../util/sales.service';

export const useSales = () => {
	const dispatch = useDispatch();

	const startGetCompanies = async () => {
		try {
			const { data } = await getSalesCompanies();
			if (data.message === LIST_SUCCESS) {
				dispatch(loadCompanies({ companies: data.data.dataUsers }));
			}
		} catch (error) {
			alert('ERROR LISTAR LAS EMPRESAS');
		}
	};

	return {
		startGetCompanies,
	};
};
