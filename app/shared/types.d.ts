export interface IUser {
	user_id: string;
}

export interface IApiErrorSchema {
	code: number; // internal error code, NOT http status code
	error: string; // error slug
	message: string; // error message
}

export interface INoopAction {
	type: 'NOOP';
	data: any;
}
