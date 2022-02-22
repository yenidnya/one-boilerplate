import AuthModuleSaga from '@app/pages/Auth/auth.saga';
import { all, fork } from 'redux-saga/effects';
import AppModuleSaga from '@app/containers/App/app.saga';

export default function* rootSaga(): Generator {
	yield all([fork(AuthModuleSaga), fork(AppModuleSaga)]);
}
