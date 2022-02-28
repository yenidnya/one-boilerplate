// import { errorHandlers } from '@app/services/error-handlers';
import { APP_ACTION_TYPES } from '@app/containers/App/app.actions';
import axios from 'axios';
import { runSaga } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { GenericActionCreator, serviceWrapperSaga, useInjectReducer, useInjectSaga, useSelectedState } from '../utils';

describe('Redux Utils', () => {
	it('should define GenericActionCreator', () => {
		expect(GenericActionCreator).toBeDefined();
	});

	it('should define useInjectReducer', () => {
		expect(useInjectReducer).toBeDefined();
	});

	it('should define useInjectSaga', () => {
		expect(useInjectSaga).toBeDefined();
	});

	it('should define useSelectedState', () => {
		expect(useSelectedState).toBeDefined();
	});

	it('should define serviceWrapperSaga', () => {
		expect(serviceWrapperSaga).toBeDefined();
	});

	it('should successfully call serviceWrapperSaga with given function', () => {
		const fn = jest.fn();
		const args = [1, 2, 3];
		const cancelToken = axios.CancelToken.source();
		const generator = serviceWrapperSaga(fn, ...args);
		expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(call(fn, ...args, { cancelToken: cancelToken.token })));
	});

	it('should fail call serviceWrapperSaga with given function', async () => {
		const triggeredEffects: any[] = [];
		const dispatchedActions: any[] = [];
		const fn = jest.fn();
		const args = [1, 2, 3];
		const cancelToken = axios.CancelToken.source();
		fn.mockRejectedValue({ response: { status: 404, data: { code: 404, error: 'failed', message: 'test failed' } } });
		await runSaga<any, any, any>(
			{
				dispatch: action => dispatchedActions.push(action),
				sagaMonitor: {
					effectTriggered: effect => triggeredEffects.push(effect),
				},
			},
			serviceWrapperSaga,
			fn,
			...args,
		).toPromise();

		expect(JSON.stringify(triggeredEffects[0].effect)).toEqual(JSON.stringify(call(fn, ...args, { cancelToken: cancelToken.token })));
		expect(dispatchedActions[0].type).toEqual(APP_ACTION_TYPES.SET_NOTIFICATION);
		expect(dispatchedActions[0].data.message).toEqual('test failed');
		expect(dispatchedActions[0].data.type).toEqual('error');
		expect(dispatchedActions[0].data.key).toEqual(`GenericError-404-failed`);
		expect(dispatchedActions[0].data.duration).toEqual(3000);
	});
});
