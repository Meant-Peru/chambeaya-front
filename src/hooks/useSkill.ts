import React from 'react';
import { SkillAdd } from '../interfaces/Skill';


export const useSkillForm = () => {
	const [formskill, setForm] = React.useState<SkillAdd>({
		_id: '',
		idUser: '',
		nameSkill: '',
		descriptionSkill: '',
	});

	const handleFormSkill = (event: any) => {
		setForm({
			...formskill,
			[event.target.name]: event.target.value,
		});
	};

	const resetSkill = () => {
		setForm({
			_id: '',
			idUser: '',
			nameSkill: '',
			descriptionSkill: '',
		});
	};

	return { formskill, handleFormSkill, resetSkill };
};
