import { INoopAction } from '@app/shared/types';
import AppReducer, { initialState } from '../app.reducer';

describe('AppReducer', () => {
	it('Should return the inital state', () => {
		const action: INoopAction = {
			type: 'NOOP',
			data: null,
		};
		expect(AppReducer(undefined, action)).toEqual(initialState);
	});
});
