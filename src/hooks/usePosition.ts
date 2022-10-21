import React from 'react';
import { Position } from '../interfaces/Position';


export const usePosForm = () => {
	const [formpos, setFormPos] = React.useState<Position>({
		_id: '',
		id_category: '',
		id_user: '',
		namePosition: '',
		descriptionPosition: '',
		createdDate:''
	});

	const handleFormPos = (event: any) => {
		setFormPos({
			...formpos,
			[event.target.name]: event.target.value,
		});
	};

	const resetPos = () => {
		setFormPos({
			_id: '',
			id_category: '',
			id_user: '',
			namePosition: '',
			descriptionPosition: '',
			createdDate:''
		});
	};

	return { formpos, handleFormPos, resetPos, setFormPos };
};
