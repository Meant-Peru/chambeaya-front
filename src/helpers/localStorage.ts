import { UserGenerico } from '../interfaces/User';

const userNull: UserGenerico = {
	rol: '',
	dataUser: {},
};

export const getLocalStorage = (localItem: string) => {
	try {
		const serialState = localStorage.getItem(localItem);
		if (serialState === null) {
			return userNull;
		}
		return JSON.parse(serialState);
	} catch (err) {
		return userNull;
	}
};

export const savaLocalStorage = (localItem: string, data: any) => {
	try {
		const serialState = JSON.stringify(data);
		localStorage.setItem(localItem, serialState);
	} catch (err) {
		console.log(err);
	}
};

export const clearOneLocalStorage = (localItem: string) => localStorage.removeItem(localItem);

export const clearLocalStorage = () => localStorage.clear();
