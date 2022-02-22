import { ISettingsState } from './settings';
import { SettingsActions, SETTINGS_ACTION_TYPES } from './settings.actions';

export const initialState: ISettingsState = {
	color: '',
	loading: false,
};

export const SettingsReducer = (state: Readonly<ISettingsState> = initialState, action: SettingsActions): ISettingsState => {
	switch (action.type) {
		case SETTINGS_ACTION_TYPES.GET_SETTINGS:
			return { ...state, loading: true };
		case SETTINGS_ACTION_TYPES.SET_SETTINGS:
			return {
				...state,
				...action.data,
				loading: false,
			};
		default:
			return state;
	}
};
