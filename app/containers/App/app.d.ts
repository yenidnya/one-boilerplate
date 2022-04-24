import { TypeOptions } from 'react-toastify';

export interface IAppState {
	loading: boolean;
}

export interface INotification {
	message: string;
	key: string;
	duration: number;
	type: TypeOptions;
}
