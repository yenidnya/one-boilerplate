import { render } from '@app/helpers/testUtils';
import React from 'react';
import Settings from '..';
describe('Settings page', () => {
	it('should render component', () => {
		const { getByText } = render(<Settings />);
		expect(getByText('Settings')).toBeInTheDocument();
	});
});
