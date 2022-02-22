import { useInjectReducer as useReducer, useInjectSaga as useSaga } from 'redux-injectors';
import axios, { AxiosResponse } from 'axios';
import { call, cancelled } from 'redux-saga/effects';
import { GenericAction, InjectReducerParams, InjectSagaParams } from '../redux/types';
import { AnyAction } from 'redux';
import { errorHandlers } from '@app/services/error-handlers';
import { IApiErrorSchema } from '@app/shared/types';
import { shallowEqual, useSelector } from 'react-redux';
import { IGlobalState } from './reducers';

const GenericActionCreator: GenericAction = ({ data, type }): AnyAction => ({
	type,
	data,
});

const useInjectReducer = ({ key, reducer }: InjectReducerParams) => useReducer({ key, reducer });

const useInjectSaga = ({ key, saga, mode }: InjectSagaParams) => useSaga({ key, saga, mode });

const useSelectedState = <T extends keyof IGlobalState>(module: T): IGlobalState[T] => useSelector((state: IGlobalState) => state[module], shallowEqual);

function* serviceWrapperSaga<T1 extends Array<any>>(fn: (...args: any[]) => any, ...args: T1): Generator {
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();
	try {
		return yield call(fn, ...args, { cancelToken: source.token });
	} catch (e: any) {
		const { response }: { response: AxiosResponse<IApiErrorSchema> } = e;
		yield errorHandlers?.get(response.status)?.(response.data);
	} finally {
		if (yield cancelled()) {
			yield source.cancel();
		}
	}
}
export { useInjectReducer, useInjectSaga, serviceWrapperSaga, GenericActionCreator, useSelectedState };
