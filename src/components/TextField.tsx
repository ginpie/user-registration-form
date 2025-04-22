import clsx from 'clsx';

type TextFieldProps = {
  label: string;
  error?: string;
} & React.HTMLProps<HTMLInputElement>;

export default function TextField({
  label,
  error,
  type = 'text',
  ...props
}: TextFieldProps) {
  return (
    <label className="text-gray-700 font-semibold flex flex-col items-start gap-1">
      {label}
      <input
        {...props}
        className={clsx(
          'w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 transition duration-200',
          [error ? 'ring-2 ring-error' : 'focus:ring-blue-400']
        )}
        type={type}
      />
      <span className={clsx('text-error text-sm h-5', [!error && 'invisible'])}>
        {error}
      </span>
    </label>
  );
}
