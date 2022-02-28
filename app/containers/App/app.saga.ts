import { APP_ACTION_TYPES, ICloseNotification, IFetchVersionNumberAction, ISetNotification, ISetVersionStatusAction } from '@app/containers/App/app.actions';
import semverGreaterThan from '@app/helpers/versionChecker';
import { GenericActionCreator, serviceWrapperSaga } from '@app/redux/utils';
import { getVersionNumber } from '@app/services/services';
import { ForkEffect, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

export function* FetchVersionNumber(action: IFetchVersionNumberAction) {
	try {
		const metaJson: { data: { version: string } } = yield serviceWrapperSaga(getVersionNumber);
		const latestVersion: string = metaJson.data.version;
		const currentVersion: string = action.data;
		const shouldForceRefresh: boolean = semverGreaterThan(latestVersion, currentVersion);

		if (shouldForceRefresh) {
			console.log(`We have a new version - ${latestVersion}. Should force refresh`);
			yield put(
				GenericActionCreator<ISetNotification>({
					type: APP_ACTION_TYPES.SET_NOTIFICATION,
					data: {
						message: `We have a new version - ${latestVersion}. Refreshing...`,
						key: 'new-version',
						duration: 3,
						type: 'warning',
					},
				}),
			);

			yield put(
				GenericActionCreator<ISetVersionStatusAction>({
					type: APP_ACTION_TYPES.SET_VERSION_STATUS,
					data: false,
				}),
			);
		} else {
			console.log(`You have already latest version - ${latestVersion}. No refresh needed`);
			yield put(
				GenericActionCreator<ISetVersionStatusAction>({
					type: APP_ACTION_TYPES.SET_VERSION_STATUS,
					data: true,
				}),
			);
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetVersionStatusAction>({
				type: APP_ACTION_TYPES.SET_VERSION_STATUS,
				data: undefined,
			}),
		);
	}
}

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
	yield takeLatest(APP_ACTION_TYPES.FETCH_VERSION_NUMBER, FetchVersionNumber);
	yield takeEvery(APP_ACTION_TYPES.SET_NOTIFICATION, SetNotificationSaga);
	yield takeEvery(APP_ACTION_TYPES.CLOSE_NOTIFICATION, CloseNotificationSaga);
}
