export interface DetailProjectInteface {
	_id: string;
	idPostulant: string;
	idPostJob: string;
	idCompany: string;
	idPostulation: string;
	dataContract: DataContract;
	state: boolean;
	createdDate: number;
	updateDate: number;
	projectTitle: string;
	postulant: Postulant;
}

export interface Postulant {
	_id: string;
	email: string;
	avatar: string;
	password: string;
	idRol: string;
	state: boolean;
	dataUser: DataUser;
	createdDate: number;
}

export interface DataUser {
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

export interface DataContract {
	typePayment: string;
	proofPayment: string;
	paymentAmount: string;
	proofDate: string;
	states: States;
}

export interface States {
	initProject: boolean;
	stateProject: boolean;
	fullDocumentation: boolean;
	paidProject: boolean;
}
