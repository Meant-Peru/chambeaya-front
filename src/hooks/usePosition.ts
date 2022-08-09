import React from 'react';
import { Position } from '../interfaces/Position';


export const usePosForm = () => {
	const [formpos, setForm] = React.useState<Position>({
		_id: '',
		id_category: '',
		id_user: '',
		namePosition: '',
		descriptionPosition: '',
	});

	const handleFormPos = (event: any) => {
		setForm({
			...formpos,
			[event.target.name]: event.target.value,
		});
	};

	const resetPos = () => {
		setForm({
			_id: '',
			id_category: '',
			id_user: '',
			namePosition: '',
			descriptionPosition: '',
		});
	};

	return { formpos, handleFormPos, resetPos };
};
