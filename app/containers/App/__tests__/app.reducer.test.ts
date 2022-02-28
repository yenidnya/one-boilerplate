import { INoopAction } from '@app/shared/types';
import { ISetVersionStatusAction, APP_ACTION_TYPES, IResetAppStateAction } from '../app.actions';
import AppReducer, { initialState } from '../app.reducer';

describe('AppReducer', () => {
	it('Should return the inital state', () => {
		const action: INoopAction = {
			type: 'NOOP',
			data: null,
		};
		expect(AppReducer(undefined, action)).toEqual(initialState);
	});

	it('should set the isLatestVersion to false', () => {
		const action: ISetVersionStatusAction = {
			type: APP_ACTION_TYPES.SET_VERSION_STATUS,
			data: false,
		};
		expect(AppReducer(undefined, action)).toEqual({
			...initialState,
			isLatestVersion: false,
		});
	});

	it('should reset the app state', () => {
		const action: ISetVersionStatusAction = {
			type: APP_ACTION_TYPES.SET_VERSION_STATUS,
			data: false,
		};
		const state = AppReducer(undefined, action);

		const resetAction: IResetAppStateAction = {
			type: APP_ACTION_TYPES.RESET_APP_STATE,
		};
		expect(AppReducer(state, resetAction)).toEqual(initialState);
	});
});
