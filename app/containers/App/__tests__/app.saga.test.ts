import { APP_ACTION_TYPES } from '../app.actions';
import { CloseNotificationSaga, SetNotificationSaga } from '../app.saga';
import { INotification } from '@app/containers/App/app';
import { toast } from 'react-toastify';

describe('App sagas', () => {
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
