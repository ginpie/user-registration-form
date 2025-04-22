import { render, fireEvent, screen } from '@testing-library/react';
import Form from '../app/Form';

test('loads and displays greeting', async () => {
  render(<Form />);

  fireEvent.click(screen.getByText('Full Name'));

  // await screen.findByRole('heading');

  // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  // expect(screen.getByRole('button')).toBeDisabled();
});
