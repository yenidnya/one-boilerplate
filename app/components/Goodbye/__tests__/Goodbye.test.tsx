import React from 'react';
import { render, screen } from '@testing-library/react';
import Goodbye from '..';

describe('Goodbye Component', () => {
	it('renders goodbye key', () => {
		render(<Goodbye />);
		expect(screen.getByText('goodbye')).toBeInTheDocument();
	});
});
