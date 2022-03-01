import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '@app/redux/configureStore';
import { history } from '@app/helpers/history';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from '@app/containers/App';
import { i18nInit } from './i18n';
import 'react-toastify/dist/ReactToastify.css';
import './global.scss';

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const renderApplication = () => {
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				{/* default toast options */}
				<ToastContainer position="top-center" autoClose={3000} />
				{/* App */}
				<App />
			</ConnectedRouter>
		</Provider>,
		MOUNT_NODE,
	);
};

if (module.hot) {
	// Hot reloadable React components and translation json files
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./i18n', './containers/App'], () => {
		if (MOUNT_NODE) {
			ReactDOM.unmountComponentAtNode(MOUNT_NODE);
			renderApplication();
		}
	});
}

i18nInit.then(() => {
	renderApplication();
});
