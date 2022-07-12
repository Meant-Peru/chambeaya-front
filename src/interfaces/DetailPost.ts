export interface DetailPost {
	listPostJob: ListPostJob[];
	listSkills: ListSkill[];
	postulants: PostulantJob[];
}

export interface ListPostJob {
	_id: string;
	title: string;
	descriptionPost: string;
	funtionsPost: string;
	priority: number;
	location: string;
	modality: string;
	idCategory: string;
	idPosition: string;
	idCompany: string;
	idsSkillsPostJob: string[];
	salaryRange: string;
	timeEstimated: string;
	state: boolean;
	createdDate: number;
	updateDate: number;
	dataCompany: DataCompany;
	listSkills: ListSkill[];
}

export interface DataCompany {
	businessName: string;
	description: string;
	email: string;
	facebook: string;
	linkedin: string;
	phone: string;
	rol: string;
	ruc: string;
	web: string;
	youtube: string;
}

export interface ListSkill {
	_id: string;
	nameSkill: string;
	descriptionskill: string;
	idUser: string;
	createdDate: number;
}

export interface PostulantJob {
	_id: string;
	idPostJob: string;
	idPostulant: string;
	documentType: string;
	documentNumber: string;
	amountEstimated: string;
	typeAmount: string;
	skillsIds: string[];
	typeBio: string;
	linkBio: string;
	createdDate: number;
	updateDate: number;
	stateSalary: boolean;
	stateExperience: boolean;
	porcentageSkills: number;
	namePostulant: string;
	lastNamePostulant: string;
}
