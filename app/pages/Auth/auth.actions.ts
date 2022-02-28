import { ILoginForm, IAuthState } from '@app/pages/Auth/auth';
import { INoopAction } from '@app/shared/types';

export enum LOGIN_ACTION_TYPES {
	GET_LOGIN = '[Login] Get Login',
	SET_LOGIN = '[Login] Set Login',
	GET_LOGIN_FAILED = '[Login] Get Login Failed',
}

export interface IGetLoginAction {
	type: LOGIN_ACTION_TYPES.GET_LOGIN;
	data: ILoginForm;
}

export interface IGetLoginFailedAction {
	type: LOGIN_ACTION_TYPES.GET_LOGIN_FAILED;
}

export interface ISetLoginAction {
	type: LOGIN_ACTION_TYPES.SET_LOGIN;
	data: IAuthState;
}

export type LoginActions = INoopAction | IGetLoginAction | ISetLoginAction | IGetLoginFailedAction;
