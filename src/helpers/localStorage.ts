import { UserGenerico } from '../interfaces/User';
import { USER } from './constants';

const userNull: UserGenerico = {
	rol: '',
	id: '',
	dataUser: {},
};

export const getLocalStorage = (localItem: string) => {
	try {
		const serialState = window.sessionStorage.getItem(localItem);
		if (serialState === null) {
			return localItem === USER ? userNull : null;
		}
		return JSON.parse(serialState);
	} catch (err) {
		return localItem === USER ? userNull : null;
	}
};

export const saveLocalStorage = (localItem: string, data: any) => {
	try {
		const serialState = JSON.stringify(data);
		window.sessionStorage.setItem(localItem, serialState);
	} catch (err) {
		console.log(err);
	}
};

export const clearOneLocalStorage = (localItem: string) => sessionStorage.removeItem(localItem);

export const clearLocalStorage = () => sessionStorage.clear();
