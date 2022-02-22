import { IAuthState } from './auth';
import { LoginActions, LOGIN_ACTION_TYPES } from './auth.actions';

export const initialState: IAuthState = {
	user_id: '',
	refresh_token: '',
	access_token: '',
	loggedIn: false,
};

const AuthReducer = (state: Readonly<IAuthState> = initialState, action: LoginActions): IAuthState => {
	switch (action.type) {
		case LOGIN_ACTION_TYPES.GET_LOGIN:
			return { ...state, loading: true };
		case LOGIN_ACTION_TYPES.SET_LOGIN:
			return {
				...action.data,
				loading: false,
			};
		case LOGIN_ACTION_TYPES.GET_LOGIN_FAILED:
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default AuthReducer;
