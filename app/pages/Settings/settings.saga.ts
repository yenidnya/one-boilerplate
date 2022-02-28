import { GenericActionCreator, serviceWrapperSaga } from '@app/redux/utils';
import { getSettings } from '@app/services/services';
import { put, takeLatest } from 'redux-saga/effects';
import { ISettingsState } from './settings';
import { ISetSettingsAction, SETTINGS_ACTION_TYPES } from './settings.actions';

export function* GetSettings() {
	try {
		const response: ISettingsState = yield serviceWrapperSaga(getSettings);
		yield put(
			GenericActionCreator<ISetSettingsAction>({
				type: SETTINGS_ACTION_TYPES.SET_SETTINGS,
				data: { color: response?.color, loading: false },
			}),
		);
	} catch (e) {
		yield put(
			GenericActionCreator<ISetSettingsAction>({
				type: SETTINGS_ACTION_TYPES.SET_SETTINGS,
				data: { color: '', loading: false },
			}),
		);
	}
}

/**
 * LoginModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* SettingsModuleSaga(): Generator {
	yield takeLatest(SETTINGS_ACTION_TYPES.GET_SETTINGS, GetSettings);
}
