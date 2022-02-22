/**
 * Combine all reducers in this file and export the combined reducers.
 */

import AuthReducer from '@app/pages/Auth/auth.reducer';
import { IAuthState } from '@app/pages/Auth/auth';
import { history } from '@app/helpers/history';
import { connectRouter, RouterState } from 'connected-react-router';
import { CombinedState, combineReducers, Reducer } from 'redux';
import { IAppState } from '@app/containers/App/app';
import AppReducer from '@app/containers/App/app.reducer';
import { ISettingsState } from '@app/pages/Settings/settings';

interface IRootState {
	router: RouterState;
	global: IAppState;
	AUTH: IAuthState;
}

interface IInjectedState {
	SETTINGS: ISettingsState;
}

export interface IGlobalState extends IRootState, Partial<IInjectedState> {}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export const createReducer = (injectedReducers: Record<string, Reducer<keyof IGlobalState>> = {}): Reducer<CombinedState<IGlobalState>> =>
	combineReducers<IGlobalState>({
		router: connectRouter(history),
		global: AppReducer,
		AUTH: AuthReducer,
		...injectedReducers,
	});
