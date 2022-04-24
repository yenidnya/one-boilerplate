import { IAppState } from '@app/containers/App/app';
import { AppActions, APP_ACTION_TYPES } from './app.actions';

export const initialState: IAppState = {
	loading: false,
};

const AppReducer = (state: Readonly<IAppState> = initialState, action: AppActions): IAppState => {
	switch (action.type) {
		case APP_ACTION_TYPES.RESET_APP_STATE:
			return { ...initialState };
		default:
			return state;
	}
};

export default AppReducer;
