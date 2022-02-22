import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '@app/redux/configureStore';
import { history } from '@app/helpers/history';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from '@app/containers/App';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

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
