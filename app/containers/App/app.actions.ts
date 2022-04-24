import { INotification } from '@app/containers/App/app';
import { INoopAction } from '@app/shared/types';

export enum APP_ACTION_TYPES {
	SET_NOTIFICATION = `[App] Set Notification`,
	CLOSE_NOTIFICATION = `[App] Close Notification`,
	RESET_APP_STATE = `[App] Reset App State`,
}

export interface IResetAppStateAction {
	type: APP_ACTION_TYPES.RESET_APP_STATE;
}

export interface ISetNotification {
	type: APP_ACTION_TYPES.SET_NOTIFICATION;
	data: INotification;
}

export interface ICloseNotification {
	type: APP_ACTION_TYPES.CLOSE_NOTIFICATION;
	data: string;
}

export type AppActions = INoopAction | IResetAppStateAction | ISetNotification | ICloseNotification;
