import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from 'react-hook-form';

type InputErrorMessageProps = {
  message:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
  className?: string;
};

export const InputErrorMessage = ({
  message,
  className,
}: InputErrorMessageProps) => {
  if (!message) return null;
  return (
    <p className={`text-red-700 text-[15px] ${className}`}>{String(message)}</p>
  );
};
