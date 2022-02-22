import { IUser } from '@app/shared/types';

export interface IAuthResponse extends IUser {
	access_token: string;
	refresh_token: string;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface IAuthState extends IAuthResponse {
	loggedIn: boolean;
	loading?: boolean;
}
