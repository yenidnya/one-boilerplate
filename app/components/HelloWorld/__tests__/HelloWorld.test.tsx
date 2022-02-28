import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from '..';

describe('Goodbye Component', () => {
	it('renders goodbye key', () => {
		render(<HelloWorld />);
		expect(screen.getByText('hello')).toBeInTheDocument();
	});
});
