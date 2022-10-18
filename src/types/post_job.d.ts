export interface DataPostAndPostulant {
	idPostJob?: string;
	idPostulant?: string;
    documentType?: string;
    documentNumber?: string;
    typeAmount?: string;
    amountEstimated?: string;
	createdDate?: number;
	updateDate?: number;
    skillsIds?: string[];
    typeBio?: string;
    linkBio?: string;
	_id: string;
}

export interface PostJobPostulant {
	createdDate?: number;
	dataPostAndPostulant: DataPostAndPostulant;
	amountEstimated: string;
	createdDate: number;
	documentNumber: string;
	documentType: string;
	idPostJob: string;
	idPostulant: string;
	linkBio: string;
	skillsIds: any[];
	typeAmount: string;
	typeBio: string;
	updateDate: number;
	_id: string;
	descriptionPost: string;
	funtionsPost: string;
	idCategory: string;
	idCompany: string;
	idPosition: string;
	idsSkillsPostJob: string[];
	location: string;
	modality: string;
	porcentageSkills: number;
	priority: number;
	salaryRange: string;
	state: boolean;
	stateExperience: boolean;
	stateSalary: false;
	timeEstimated: string;
	title: string;
	updateDate: number;
	_id: string;
}

export interface PostJob {
	createdDate?: number;
	dataCompany?: DataCompany;
	description_post?: string;
	funtions_post?: string;
	id?: string;
	_id?: string;
	ids_Skills_post_Job?: string[];
	location?: string;
	modality?: string;
	priority?: number;
	salary_range?: string;
	state?: boolean;
	title?: string;
	updateDate?: number;
	listSkills?: any[];
	postulants?: number;
}

export interface DataCompany {
	_id?: string;
	business_name?: string;
	email?: string;
	description?: string;
	facebook?: string;
	linkedin?: string;
	phone?: string;
	ruc?: string;
	state?: boolean;
	web?: string;
	youtube?: string;
}

