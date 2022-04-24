import { APP_ACTION_TYPES, ICloseNotification, ISetNotification } from '@app/containers/App/app.actions';
import { ForkEffect, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

export function* SetNotificationSaga(action: ISetNotification) {
	try {
		yield toast(action.data.message, {
			type: action.data.type,
			toastId: action.data.key,
			autoClose: action.data.duration,
		});
	} catch (e) {}
}

export function* CloseNotificationSaga(action: ICloseNotification) {
	try {
		yield toast.dismiss(action.data);
	} catch (e) {}
}

/**
 * RootFilterModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* AppModuleSaga(): Generator<ForkEffect<never>, void, unknown> {
	yield takeEvery(APP_ACTION_TYPES.SET_NOTIFICATION, SetNotificationSaga);
	yield takeEvery(APP_ACTION_TYPES.CLOSE_NOTIFICATION, CloseNotificationSaga);
}
