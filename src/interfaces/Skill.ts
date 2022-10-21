export interface respSkill {
	skillGeneral: Skill[];
	skillPosition: Skill[];
	skillPositionUser: Skill[];
}

export interface Skill {
	_id?: string;
	idUser: string;
	nameSkill: string;
	level: string;
}

export interface SkillAdd {
	_id?: string;
	idUser: string;
	nameSkill: string;
	descriptionskill: string;
	createdDate:number
}

export interface SkillSelect {
	_id: string;
	nameSkill: string;
	select: boolean;
}

export interface SkillEnl {
	idSkill: string;
	idCategory: string;
	idPosition: string;
}
