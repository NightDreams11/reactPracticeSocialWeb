import { render, screen } from '@testing-library/react';
import SamuraiJSApp from './App';
123
test('renders learn react link', () => {
  render(<SamuraiJSApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
