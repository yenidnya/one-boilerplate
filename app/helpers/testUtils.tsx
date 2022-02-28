// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '@app/redux/configureStore';
import { history } from './history';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore(undefined, history);

function render(ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>, { ...renderOptions } = {}) {
	function Wrapper({ children }: { children: React.ReactElement<any, string | React.JSXElementConstructor<any>> }) {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>{children}</ConnectedRouter>
			</Provider>
		);
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, store };
