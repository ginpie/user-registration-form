import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField } from '../components';
import { usePersistForm } from '../hooks';

const FORM_DATA_KEY = 'registration_form_local_data';

type FormInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

type FormProps = {
  onSuccess: () => void;
};

export default function Form({ onSuccess }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
  } = useForm<FormInputs>({
    mode: 'all',
    defaultValues: {
      ...JSON.parse(localStorage.getItem(FORM_DATA_KEY) as string),
    }
  });

  usePersistForm({ value: getValues(), localStorageKey: FORM_DATA_KEY });

  const onSubmit: SubmitHandler<FormInputs> = () => {
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-1">
      <TextField
        label="Full Name"
        placeholder="Enter your full name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...register('fullName', { required: 'Full name is required' })}
        error={errors.fullName?.message}
      />

      <TextField
        label="Email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
        })}
        error={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        placeholder="Enter your password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        error={errors.password?.message}
      />

      <TextField
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...register('confirmPassword', {
          validate: (value) => {
            if (value !== getValues('password')) {
              return 'Passwords do not match';
            }
          },
        })}
        error={errors.confirmPassword?.message}
      />

      <div className="mt-10">
        <Button type="submit" disabled={!isValid}>
          Register
        </Button>
      </div>
    </form>
  );
}
