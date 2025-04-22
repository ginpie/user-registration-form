import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('user registration', () => {
  const fillForm = async (
    username = 'testuser',
    email = 'test@example.com',
    password = 'password123',
    confirmPassword = 'password123'
  ) => {
    await userEvent.type(screen.getByLabelText(/full name/i), username);
    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/^password$/i), password);
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      confirmPassword
    );
  };

  it('should render the form', async () => {
    // render(<Form />);
    // const fullNameInput = screen.getByLabelText('Full Name');
    // await userEvent.click(fullNameInput);
    // await userEvent.type(fullNameInput, 'test name');
    // expect(screen.getByText('Full Name')).toBeInTheDocument();
  });

  it('', async () => {
    //
  });

  it('should show error message when full name is empty', async () => {
    render(<App />);

    const fullNameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);

    expect(fullNameInput).toBeInTheDocument();
    expect(screen.queryByText(/full name is required/i)).toBeNull();
    await userEvent.click(fullNameInput);
    await userEvent.click(emailInput); // blur the input to trigger validation
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
  });

  it('should show error message when email is empty or invalid', async () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByText(/email is required/i)).toBeNull();
    await userEvent.click(emailInput);
    await userEvent.click(passwordInput); // blur the input to trigger validation
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    expect(screen.queryByText(/invalid email address/i)).toBeNull();
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(passwordInput); // blur the input to trigger validation
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });

  it('should show error message when password is empty or invalid', async () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText('Password');

    expect(passwordInput).toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).toBeNull();
    await userEvent.click(passwordInput);
    await userEvent.click(emailInput); // blur the input to trigger validation
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();

    expect(
      screen.queryByText(/password must be at least 8 characters/i)
    ).toBeNull();
    await userEvent.type(passwordInput, 'abc');
    await userEvent.click(emailInput); // blur the input to trigger validation
    expect(
      screen.getByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it('should show success message when user successfully submit the form', async () => {
    render(<App />);

    expect(screen.queryByText(/congrats/i)).toBeNull();

    const registerButton = screen.getByTestId('register-button');
    expect(registerButton).toBeDisabled();
    await fillForm();
    expect(registerButton).toBeEnabled();
    await userEvent.click(registerButton);

    expect(screen.getByText(/congrats/i)).toBeInTheDocument();
  });
});
