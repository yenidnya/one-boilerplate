import { request } from '@app/helpers/request';
import { runSaga } from 'redux-saga';
import { SETTINGS_ACTION_TYPES } from '../settings.actions';
import { GetSettings } from '../settings.saga';

describe('Settings sagas', () => {
	it('should successfully fetch settings', async () => {
		const dispatched: any[] = [];
		const COLOR = 'red';
		jest.spyOn(request, 'get').mockImplementation(() => Promise.resolve({ color: COLOR }));
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatched.push(action),
			},
			GetSettings,
			{},
		).toPromise();

		expect(dispatched[0].type).toEqual(SETTINGS_ACTION_TYPES.SET_SETTINGS);
		expect(dispatched[0].data).toEqual({ color: COLOR, loading: false });
	});

	it('should fail fetch settings', async () => {
		const dispatched: any[] = [];
		jest.spyOn(request, 'get').mockImplementation(() => Promise.reject());
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatched.push(action),
			},
			GetSettings,
			{},
		).toPromise();

		expect(dispatched[0].type).toEqual(SETTINGS_ACTION_TYPES.SET_SETTINGS);
		expect(dispatched[0].data).toEqual({ color: '', loading: false });
	});
});
