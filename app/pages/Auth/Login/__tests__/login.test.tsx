import Login from '..';
import { render } from '@app/helpers/testUtils';
import React from 'react';

describe('Login', () => {
	it('should define the component', () => {
		expect(Login).toBeDefined();
	});

	it('should render Login component', () => {
		const { getByText } = render(<Login />);
		expect(getByText('Login')).toBeInTheDocument();
	});
});
