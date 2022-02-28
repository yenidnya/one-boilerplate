import App from '..';
import { render } from '@app/helpers/testUtils';
import React from 'react';

describe('App component', () => {
	it('should render the cache buster', () => {
		const app = render(<App />);
		expect(app).toBeDefined();
	});
});
