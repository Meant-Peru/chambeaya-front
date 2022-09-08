import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LIST_SUCCESS } from '../helpers/constants';
import { loadCompanies } from '../redux/slices/salesSlice';
import { getSalesCompanies } from '../util/sales.service';

export const useSales = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const startGetCompanies = async () => {
		try {
			const { data } = await getSalesCompanies();
			if (data.message === LIST_SUCCESS) {
				// Sort by business names alphabetically.
				data.data.dataUsers = data.data.dataUsers.sort((a, b) => {
					if (a.dataUser.businessName.toLowerCase() < b.dataUser.businessName.toLowerCase()) {
						return -1;
					}
					if (a.dataUser.businessName.toLowerCase() > b.dataUser.businessName.toLowerCase()) {
						return 1;
					}
					return 0;
				});
				console.log(data.data.dataUsers);
				dispatch(loadCompanies({ companies: [...data.data.dataUsers] }));
			}
		} catch (error) {
			alert('ERROR LISTAR LAS EMPRESAS');
		}
	};

	return {
		startGetCompanies,
	};
};
