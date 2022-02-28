import { INoopAction } from '@app/shared/types';
import { IGetSettingsAction, ISetSettingsAction, SETTINGS_ACTION_TYPES } from '../settings.actions';
import { SettingsReducer, initialState } from '../settings.reducer';

describe('SettingsReducer', () => {
	it('Should return the inital state', () => {
		const action: INoopAction = {
			type: 'NOOP',
			data: null,
		};
		expect(SettingsReducer(undefined, action)).toEqual(initialState);
	});

	it('should get settings', () => {
		const action: IGetSettingsAction = {
			type: SETTINGS_ACTION_TYPES.GET_SETTINGS,
		};
		expect(SettingsReducer(undefined, action)).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should set settings', () => {
		const action: ISetSettingsAction = {
			type: SETTINGS_ACTION_TYPES.SET_SETTINGS,
			data: {
				color: 'red',
			},
		};
		expect(SettingsReducer(undefined, action)).toEqual({
			color: 'red',
			loading: false,
		});
	});
});
