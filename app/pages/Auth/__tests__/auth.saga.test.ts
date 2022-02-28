import { runSaga } from 'redux-saga';
import { LoginSaga } from '../auth.saga';
import { LOGIN_ACTION_TYPES } from '../auth.actions';
import { request } from '@app/helpers/request';
import { IAuthResponse } from '../auth';

describe('Auth sagas', () => {
	it('should successfully login user', async () => {
		const dispatched: any[] = [];
		const payload: IAuthResponse = {
			access_token: 'token',
			refresh_token: 'refresh',
			user_id: 'user',
		};
		jest.spyOn(request, 'post').mockImplementation(() => Promise.resolve(payload));
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatched.push(action),
			},
			LoginSaga,
			{
				type: LOGIN_ACTION_TYPES.GET_LOGIN,
				data: {},
			},
		).toPromise();

		expect(dispatched[0].type).toEqual(LOGIN_ACTION_TYPES.SET_LOGIN);
		expect(dispatched[0].data).toEqual({ ...payload, loggedIn: true });
	});

	it('should fail login user', async () => {
		const dispatched: any[] = [];
		jest.spyOn(request, 'post').mockImplementation(() => Promise.reject());
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatched.push(action),
			},
			LoginSaga,
			{
				type: LOGIN_ACTION_TYPES.GET_LOGIN,
				data: {},
			},
		).toPromise();

		expect(dispatched[0].type).toEqual(LOGIN_ACTION_TYPES.GET_LOGIN_FAILED);
	});
});
