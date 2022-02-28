import { INoopAction } from '@app/shared/types';
import { ISettingsState } from './settings';

export enum SETTINGS_ACTION_TYPES {
	GET_SETTINGS = '[Settings] Get Settings',
	SET_SETTINGS = '[Settings] Set Settings',
}

export interface IGetSettingsAction {
	type: SETTINGS_ACTION_TYPES.GET_SETTINGS;
}

export interface ISetSettingsAction {
	type: SETTINGS_ACTION_TYPES.SET_SETTINGS;
	data: Partial<ISettingsState>;
}

export type SettingsActions = INoopAction | IGetSettingsAction | ISetSettingsAction;
