import { ENVIRONMENT } from '@app/config';
import { IGetLoginAction, IGetLoginFailedAction, ISetLoginAction, LOGIN_ACTION_TYPES } from '@app/pages/Auth/auth.actions';
import { GenericActionCreator, serviceWrapperSaga } from '@app/redux/utils';
import { signInService } from '@app/services/services';
import { put, takeLatest } from 'redux-saga/effects';
import { IAuthResponse } from '@app/pages/Auth/auth';

function* LoginSaga(action: IGetLoginAction) {
	const { data } = action;
	try {
		const LoginUserData: IAuthResponse = yield serviceWrapperSaga(signInService, data);

		if (LoginUserData) {
			localStorage.setItem(ENVIRONMENT.PROJECT_ID, JSON.stringify(LoginUserData));

			yield put(
				GenericActionCreator<ISetLoginAction>({
					type: LOGIN_ACTION_TYPES.SET_LOGIN,
					data: { ...LoginUserData, loggedIn: true },
				}),
			);
		}
	} catch (e) {
		yield put(GenericActionCreator<IGetLoginFailedAction>({ type: LOGIN_ACTION_TYPES.GET_LOGIN_FAILED }));
	}
}

/**
 * LoginModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* AuthModuleSaga(): Generator {
	yield takeLatest(LOGIN_ACTION_TYPES.GET_LOGIN, LoginSaga);
}
