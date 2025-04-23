import clsx from 'clsx';

type CheckboxProps = {
  label: string;
  error?: string;
} & React.HTMLProps<HTMLInputElement>;

export default function Checkbox({
  label,
  error,
  checked,
  ...props
}: CheckboxProps) {
  const isSelected = checked || props.defaultChecked;

  return (
    <label className="cursor-pointer text-gray-700 font-semibold flex flex-col items-start gap-1">
      <input {...props} className="hidden" type="checkbox" />

      <div className="flex items-center gap-2 text-gray-700 font-semibold">
        <svg className="shrink-0" width={24} height={24} aria-hidden="true">
          <rect
            x={3}
            y={3}
            rx={6}
            ry={6}
            width={18}
            height={18}
            fill="#d2d4d9"
          />
          {isSelected && (
            <path
              fill="#000000"
              transform="translate(5 1) scale(1.9)"
              d={`M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1
              1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712
              6A.999.999 0 0 1 3.788 9z`}
            />
          )}
        </svg>
        {label}
      </div>

      <span className={clsx('text-error text-sm h-5', [!error && 'invisible'])}>
        {error}
      </span>
    </label>
  );
}
