import { INoopAction } from '@app/shared/types';
import { IGetLoginAction, IGetLoginFailedAction, ISetLoginAction, LOGIN_ACTION_TYPES } from '../auth.actions';
import AuthReducer, { initialState } from '../auth.reducer';

describe('AuthReducer', () => {
	it('should return inital state', () => {
		const action: INoopAction = {
			type: 'NOOP',
			data: null,
		};
		expect(AuthReducer(undefined, action)).toEqual(initialState);
	});

	it('should set loading true while getLogin', () => {
		const action: IGetLoginAction = {
			type: LOGIN_ACTION_TYPES.GET_LOGIN,
			data: {
				email: 'foo',
				password: 'bar',
			},
		};
		expect(AuthReducer(undefined, action)).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should set login with data', () => {
		const payload = {
			access_token: 'token',
			refresh_token: 'refresh',
			user_id: 'user',
			loggedIn: true,
		};
		const action: ISetLoginAction = {
			type: LOGIN_ACTION_TYPES.SET_LOGIN,
			data: payload,
		};
		expect(AuthReducer(undefined, action)).toEqual({
			...payload,
			loading: false,
		});
	});

	it('should set loading false when login fails', () => {
		const action: IGetLoginFailedAction = {
			type: LOGIN_ACTION_TYPES.GET_LOGIN_FAILED,
		};
		expect(AuthReducer(undefined, action)).toEqual({
			...initialState,
			loading: false,
		});
	});
});
