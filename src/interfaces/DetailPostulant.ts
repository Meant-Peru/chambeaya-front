export interface DetailPostulant {
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
	stateSalary: boolean;
	stateExperience: boolean;
	porcentageSkills: number;
	skillsMatch: any[];
	dataPostAndPostulant: DataPostAndPostulant;
}

export interface DataPostAndPostulant {
	_id: string;
	idPostJob: string;
	idPostulant: string;
	documentType: string;
	documentNumber: string;
	amountEstimated: string;
	typeAmount: string;
	skillsIds: any[];
	typeBio: string;
	linkBio: string;
	createdDate: number;
	updateDate: number;
	userDataPostulant: UserDataPostulant;
}

export interface UserDataPostulant {
	email: string;
	rol: string;
	name: string;
	lastName: string;
	dni: number;
	phone: string;
	genere: string;
	brithdayDate: string;
	documentType: string;
	documentNumber: string;
	category: Category;
	skillsIds: string[];
	typeBio: string;
	linkBio: string;
	experience: any[];
	project: string;
	timeProject: string;
	functions: string;
}

export interface Category {
	_id: string;
	nameCategory: string;
	descriptionCategory: string;
	createdDate: number;
}
