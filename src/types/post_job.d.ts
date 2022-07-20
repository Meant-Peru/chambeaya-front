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
