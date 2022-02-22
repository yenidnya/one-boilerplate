import { GenericActionCreator } from '@app/redux/utils';
import { put, PutEffectDescriptor, SimpleEffect } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { APP_ACTION_TYPES, ISetNotification } from '@app/containers/App/app.actions';
import { IApiErrorSchema } from '@app/shared/types';

const errorCallback: (error: IApiErrorSchema) => SimpleEffect<'PUT', PutEffectDescriptor<AnyAction>> = (error: IApiErrorSchema) => {
	console.log('error', error);
	return put(
		GenericActionCreator<ISetNotification>({
			type: APP_ACTION_TYPES.SET_NOTIFICATION,
			data: {
				message: error.message,
				key: `GenericError-${error.code}-${error.error}`,
				duration: 3000,
				type: 'error',
			},
		}),
	);
};

export const errorHandlers: Map<number, (error: IApiErrorSchema) => SimpleEffect<'PUT', PutEffectDescriptor<AnyAction>>> = new Map([
	[400, errorCallback],
	[404, errorCallback],
	[409, errorCallback],
	[401, errorCallback],
	[403, errorCallback],
	[500, errorCallback],
]);
