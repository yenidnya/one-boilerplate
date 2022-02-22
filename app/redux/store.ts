import configureStore from '@app/redux/configureStore';
import { InjectedStore } from '@app/redux/types';
import { history } from '@app/helpers/history';

const store: InjectedStore = configureStore({}, history);

export default store;
