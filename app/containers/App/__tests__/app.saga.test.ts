import axios from 'axios';
import { runSaga } from 'redux-saga';
import { APP_ACTION_TYPES } from '../app.actions';
import { CloseNotificationSaga, FetchVersionNumber, SetNotificationSaga } from '../app.saga';
import { INotification } from '@app/containers/App/app';
import { toast } from 'react-toastify';

describe('App sagas', () => {
	it('should set version status to false', async () => {
		const dispatched: any[] = [];
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { version: '1.0.0' } }));
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatched.push(action),
			},
			FetchVersionNumber,
			{
				type: APP_ACTION_TYPES.FETCH_VERSION_NUMBER,
				data: '0.0.1',
			},
		).toPromise();

		expect(dispatched[0].type).toEqual(APP_ACTION_TYPES.SET_NOTIFICATION);
		expect(dispatched[1].type).toEqual(APP_ACTION_TYPES.SET_VERSION_STATUS);
		expect(dispatched[1].data).toEqual(false);
	});

	it('should set version status to true', async () => {
		const dispatched: any[] = [];
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { version: '1.0.0' } }));
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatched.push(action),
			},
			FetchVersionNumber,
			{
				type: APP_ACTION_TYPES.FETCH_VERSION_NUMBER,
				data: '1.0.1',
			},
		).toPromise();

		expect(dispatched[0].type).toEqual(APP_ACTION_TYPES.SET_VERSION_STATUS);
		expect(dispatched[0].data).toEqual(true);
	});

	it('should set version status to undefined', async () => {
		const dispatched: any[] = [];
		jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error("failed")));
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatched.push(action),
			},
			FetchVersionNumber,
			{
				type: APP_ACTION_TYPES.FETCH_VERSION_NUMBER,
				data: '0.0.1',
			},
		).toPromise();

		expect(dispatched[0].type).toEqual(APP_ACTION_TYPES.SET_VERSION_STATUS);
		expect(dispatched[0].data).toEqual(undefined);
	})

	it('should set notification with provided data', async () => {
		const payload: INotification = {
			message: 'test message',
			key: 'test key',
			duration: 1000,
			type: 'default',
		};
		const generator = SetNotificationSaga({
			type: APP_ACTION_TYPES.SET_NOTIFICATION,
			data: payload,
		});
		expect(generator.next().value).toEqual(
			toast(payload.message, {
				type: payload.type,
				toastId: payload.key,
				autoClose: payload.duration,
			}),
		);
	});

	it('should close notification with provided key', async () => {
		const key: string = 'test key';

		const generator = CloseNotificationSaga({
			type: APP_ACTION_TYPES.CLOSE_NOTIFICATION,
			data: key,
		});

		expect(generator.next().value).toEqual(toast.dismiss(key));
	});
});
