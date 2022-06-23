export interface respSkill {
	skillGeneral: Skill[];
	skillPosition: Skill[];
	skillPositionUser: Skill[];
}

export interface Skill {
	id: string;
	_id?: string;
	idUser: string;
	nameSkill: string;
	level: string;
}
