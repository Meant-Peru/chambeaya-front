export interface Project {
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
