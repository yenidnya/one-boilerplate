import { render, screen } from '@testing-library/react';
import App from 'containers/App';

test('renders Hello', () => {
	render(<App />);
	const hello = screen.getByText(/Hello/i);
	expect(hello).toBeInTheDocument();
});
