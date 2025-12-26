import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jobs heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Jobs/i });
  expect(heading).toBeInTheDocument();
});
