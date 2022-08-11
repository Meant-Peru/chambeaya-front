import React from 'react';
import { SkillAdd, SkillEnl } from '../interfaces/Skill';


export const useSkillForm = () => {
	const [formskill, setFormSkill] = React.useState<SkillAdd>({
		_id: '',
		idUser: '',
		nameSkill: '',
		descriptionSkill: '',
	});

	const handleFormSkill = (event: any) => {
		setFormSkill({
			...formskill,
			[event.target.name]: event.target.value,
		});
	};

	const resetSkill = () => {
		setFormSkill({
			_id: '',
			idUser: '',
			nameSkill: '',
			descriptionSkill: '',
		});
	};

	return { formskill, handleFormSkill, resetSkill };
};

export const useEnlForm = () => {
	const [formenl, setFormEnl] = React.useState<SkillEnl>({
		idSkill: '',
		idPosition: '',
		idCategory: '',
	});

	const handleFormEnl = (event: any) => {
		setFormEnl({
			...formenl,
			[event.target.name]: event.target.value,
		});
	};

	const resetEnl = () => {
		setFormEnl({
			idSkill: '',
			idPosition: '',
			idCategory: '',
		});
	};

	return { formenl, handleFormEnl, resetEnl };
};
