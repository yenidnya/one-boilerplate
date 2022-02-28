import { render } from '@app/helpers/testUtils';
import React from 'react';
import CacheBuster from '..';

describe('Cache buster', () => {
	it('should render the component', () => {
		const r = render(
			<CacheBuster>
				<h1>Buster</h1>
			</CacheBuster>,
		);
		expect(r).toBeDefined();
		expect(r.getByText('Buster')).toBeInTheDocument();
	});
});
