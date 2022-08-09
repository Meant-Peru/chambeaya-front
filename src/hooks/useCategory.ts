import React from 'react';
import { Category } from '../interfaces/Category';


export const useCatForm = () => {
	const [formcat, setForm] = React.useState<Category>({
		_id: '',
		nameCategory: '',
		descriptionCategory: '',
	});

	const handleFormCat = (event: any) => {
		setForm({
			...formcat,
			[event.target.name]: event.target.value,
		});
	};

	const resetCat = () => {
		setForm({
			_id: '',
			nameCategory: '',
			descriptionCategory: '',
		});
	};

	return { formcat, handleFormCat, resetCat };
};
