type ButtonProps = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-full enabled:cursor-pointer disabled:cursor-not-allowed bg-neutral-800 disabled:bg-neutral-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-neutral-600 transition duration-200"
      {...props}
    >
      {children}
    </button>
  );
}
