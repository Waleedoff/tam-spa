import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  hint?: string;
  error?: string;
  label: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}
export function InputField({
  label,
  hint,
  error,
  isValid,
  startIcon,
  endIcon,
  ...props
}: InputFieldProps): JSX.Element {
  const getValidationClass = () => {
    switch (isValid) {
      case true:
        return 'border-green-500';
      case false:
        return 'border-red-500';
      default:
        return 'border-[#666666]';
    }
  };
  const getValidationIcon = () => {
    switch (isValid) {
      case true:
        return <HiOutlineCheckCircle className="text-lg text-green-500" />;
      case false:
        return <HiOutlineExclamationCircle className="text-lg text-red-500" />;
      default:
        return null;
    }
  };
  const getErrorColor = () => {
    switch (isValid) {
      case true:
        return 'text-green-500';
      case false:
        return 'text-red-500';
      default:
        return 'text-black';
    }
  };
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className={`mb-2 block text-sm font-semibold ${getErrorColor()}`}>{label}</label>
      )}
      <div className="relative">
        {startIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2">{startIcon}</div>}
        <input
          {...props}
          className={`w-full rounded-[3px] border bg-white p-2 text-sm text-gray-800 ${getValidationClass()} ${props.className ?? ''}`}
        />
        {(endIcon || isValid !== undefined) && (
          <div className="absolute top-1/2 flex -translate-y-1/2 items-center space-x-1 ltr:right-3 rtl:left-3">
            {endIcon}
            {getValidationIcon()}
          </div>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}