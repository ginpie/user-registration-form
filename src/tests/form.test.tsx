import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('1. user registration successful flow', () => {
  const fillForm = async (
    fullName = 'John Doe',
    email = 'test@example.com',
    password = 'password123',
    confirmPassword = 'password123'
  ) => {
    const fullNameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const acceptTermsCheckbox = screen.getByLabelText(
      /i accept the terms and conditions/i
    );

    await userEvent.clear(fullNameInput);
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.clear(confirmPasswordInput);

    await userEvent.type(fullNameInput, fullName);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    await userEvent.type(confirmPasswordInput, confirmPassword);
    await userEvent.click(acceptTermsCheckbox);
  };

  it('1.1. should show success message when user successfully submit the form', async () => {
    render(<App />);

    const form = screen.getByTestId('form');

    expect(screen.queryByText(/congrats/i)).toBeNull();

    const registerButton = screen.getByTestId('register-button');
    expect(registerButton).toBeDisabled();
    await fillForm();
    // check if the form states are updated correctly
    expect(form).toHaveFormValues({
      fullName: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    // check if the register button is enabled after filling the form
    expect(registerButton).not.toBeDisabled();
    await userEvent.click(registerButton);

    // check if the success message is displayed
    expect(screen.getByText(/congrats/i)).toBeInTheDocument();
  });
});

describe('2. form validation', () => {
  it('2.1. should show error message when full name is empty', async () => {
    render(<App />);

    const fullNameInput = screen.getByLabelText(/full name/i);

    expect(fullNameInput).toBeInTheDocument();
    expect(screen.queryByText(/full name is required/i)).toBeNull();
    await userEvent.click(fullNameInput);
    await userEvent.clear(fullNameInput);
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
  });

  it('2.2. should show error message when email is empty or invalid', async () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    expect(emailInput).toBeInTheDocument();
    expect(screen.queryByText(/email is required/i)).toBeNull();
    await userEvent.click(emailInput);
    await userEvent.clear(emailInput);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    expect(screen.queryByText(/invalid email address/i)).toBeNull();
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(passwordInput); // blur the input to trigger validation
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });

  it('2.3. should show error message when password is empty or invalid', async () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    expect(passwordInput).toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).toBeNull();
    await userEvent.click(passwordInput);
    await userEvent.clear(passwordInput);
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();

    expect(
      screen.queryByText(/password must be at least 8 characters/i)
    ).toBeNull();
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'abc');
    await userEvent.click(emailInput); // blur the input to trigger validation
    expect(
      screen.getByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it('2.4. should show error message when confirm password does not match', async () => {
    render(<App />);

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    expect(passwordInput).toBeInTheDocument();
    expect(screen.queryByText(/passwords do not match/i)).toBeNull();
    await userEvent.click(passwordInput);
    await userEvent.type(passwordInput, 'abcdabcd');
    await userEvent.click(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'abc');
    await userEvent.click(passwordInput); // blur the input to trigger validation
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('2.5. should show error message when accept terms is not checked', async () => {
    render(<App />);

    const acceptTermsCheckbox = screen.getByLabelText(
      /i accept the terms and conditions/i
    );

    expect(acceptTermsCheckbox).toBeInTheDocument();
    expect(screen.queryByText(/you must accept the terms/i)).toBeNull();
    await userEvent.click(acceptTermsCheckbox);
    expect(acceptTermsCheckbox).not.toBeChecked();
    expect(screen.getByText(/you must accept the terms/i)).toBeInTheDocument();
  });
});
