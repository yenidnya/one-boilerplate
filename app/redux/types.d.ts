import { Reducer, Store } from 'redux';
import { SagaInjectionModes } from 'redux-injectors';
import { Saga } from 'redux-saga';
import { IGlobalState } from './reducers';

export interface InjectedStore extends Store {
	injectedReducers: any;
	injectedSagas: any;
	runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
	key: keyof IGlobalState;
	reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
	key: keyof IGlobalState;
	saga: Saga;
	mode?: SagaInjectionModes;
}

export type GenericAction = {
	<T extends { data?: any; type: string }>({ data, type }: T): AnyAction;
};
