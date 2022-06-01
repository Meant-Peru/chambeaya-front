export default interface User {
	email: string;
	password?: string;
	name?: string;
	lastName?: string;
	phone: string;
	rolUser?: string;
	sex?: string;
	birthDayDate?: Date;
	businessName?: string;
	ruc?: string;
	description?: string;
	youtube?: string;
	facebook?: string;
	linkedin?: string;
	web?: string;
}

export interface UserGenerico {
	dataUser: {};
	rol: string;
	email: string;
}

export interface CompanyDetailInterface {
	youtube: string;
	businessName: string;
	ruc: string;
	web: string;
	phone: string;
	facebook: string;
	description: string;
	linkedin: string;
	state: Boolean;
	rol: string;
	email: string;
}

export interface PostulantInterface {
	name: string;
	lastName: string;
	dni: number;
	phone: string;
	genere: string;
	state: Boolean;
	ruc: number;
	brithdayDate: Date;
	rol: string;
	email: string;
}
