import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckedState } from '@radix-ui/react-checkbox';
import {
  ChangeEvent,
  forwardRef,
  LegacyRef,
  MouseEventHandler,
  ReactNode,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '../ui/checkbox';
import DatePicker from './DatePicker';
import { SkeletonLoader } from './Loader';
import CustomTooltip from './CustomTooltip';
import { FieldValues, SetFieldValue } from 'react-hook-form';

export interface InputProps {
  label?: string | ReactNode;
  placeholder?: string;
  className?: string;
  required?: boolean;
  onChange?: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  defaultValue?: string | number | Date;
  submit?: boolean;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  suffixIcon?: IconProp;
  prefixIcon?: IconProp;
  suffixIconHandler?: MouseEventHandler<HTMLAnchorElement> | undefined;
  name?: string;
  suffixIconPrimary?: boolean;
  prefixIconHandler?: MouseEventHandler<HTMLAnchorElement> | undefined;
  prefixIconPrimary?: boolean;
  prefixText?: string | ReactNode;
  defaultChecked?: CheckedState;
  accept?: string;
  min?: string | number;
  readOnly?: boolean;
  multiple?: boolean;
  labelClassName?: string;
  range?: boolean;
  fromDate?: Date;
  toDate?: Date;
  checked?: CheckedState;
  selectionType?: 'date' | 'month' | 'year' | 'recurringDate';
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  defaultCountryCode?: string;
  setValue?: SetFieldValue<FieldValues>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label = undefined,
      placeholder,
      className,
      required = false,
      value,
      onChange,
      defaultValue,
      suffixIcon = undefined,
      suffixIconHandler,
      suffixIconPrimary = false,
      prefixIcon = undefined,
      prefixIconHandler,
      prefixText = undefined,
      defaultChecked = undefined,
      name,
      accept = 'application/pdf',
      min,
      readOnly = false,
      labelClassName = '',
      multiple = false,
      fromDate,
      toDate,
      checked,
      selectionType,
      isLoading = false,
    },
    ref
  ) => {
    const hiddenFileInput = useRef<HTMLButtonElement>(null);

    if (['checkbox', 'radio'].includes(type)) {
      if (['checkbox'].includes(type)) {
        return (
          <label className="flex w-fit items-center gap-2 text-[13px]">
            <Checkbox
              onCheckedChange={
                onChange as ((checked: CheckedState) => void) | undefined
              }
              name={name}
              value={value}
              checked={checked || !!value}
              defaultChecked={defaultChecked || !!value}
              className={`${
                value || defaultChecked || checked
                  ? 'data-[state=checked]:bg-primary text-white'
                  : ''
              } w-4 h-4 border-[1.5px] cursor-pointer border-secondary outline-none focus:outline-none ease-in-out duration-50`}
            />
            <p
              className={`${
                label ? 'flex' : 'hidden'
              } text-secondary text-[13px]`}
            >
              {label}
            </p>
          </label>
        );
      }
      return (
        <label className="flex items-center gap-2 text-[13px]">
          <input
            type={type}
            name={name}
            value={value}
            defaultChecked={defaultChecked as boolean}
            checked={checked as boolean}
            onChange={onChange}
            className={`w-4 h-4 border-[1.5px] rounded-xl cursor-pointer border-secondary outline-none focus:outline-none accent-primary focus:border-[1.6px] focus:border-primary ease-in-out duration-50 ${className}`}
          />
          <p className={`${label ? 'flex' : 'hidden'} text-[13px]`}>{label}</p>
        </label>
      );
    }

    if (type === 'file') {
      const handleClick = () => {
        hiddenFileInput.current?.click();
      };
      return (
        <>
          {isLoading ? (
            <SkeletonLoader type="button" />
          ) : (
            <menu className="text-[12px] w-fit">
              <button
                type="button"
                onClick={handleClick}
                disabled={readOnly}
                className={`!bg-primary !text-white hover:!bg-primary hover:!text-white !shadow-sm py-[5px] w-full text-[12px] text-center max-[800px]:!text-[14px] px-8 rounded-md cursor-pointer ease-in-out duration-400 hover:scale-[1.005] ${
                  readOnly &&
                  '!bg-secondary hover:!bg-secondary !cursor-not-allowed'
                } ${className}`}
              >
                {placeholder || 'Choose file'}
                {multiple ? 's' : ''} {required}
              </button>
              <input
                ref={hiddenFileInput as LegacyRef<HTMLInputElement> | undefined}
                type={type}
                multiple={multiple}
                accept={accept}
                readOnly={readOnly}
                onChange={onChange}
                className="hidden"
              />
            </menu>
          )}
        </>
      );
    }

    if (['date'].includes(type)) {
      return (
        <label className={`flex flex-col gap-[5px] w-full ${labelClassName}`}>
          <p
            className={`${
              label ? 'flex items-center gap-[5px] text-[14px]' : 'hidden'
            }`}
          >
            {label}{' '}
            {required && (
              <CustomTooltip
                label={required ? `${label} is required` : ''}
                labelClassName="text-[12px] bg-red-600"
              >
                <span className="text-red-600 cursor-pointer">*</span>
              </CustomTooltip>
            )}
          </p>
          {isLoading ? (
            <SkeletonLoader type="input" />
          ) : (
            <DatePicker
              disabled={readOnly}
              placeholder={placeholder}
              fromDate={fromDate}
              toDate={toDate}
              selectionType={selectionType}
              onChange={
                onChange as
                  | ((e: Date | ChangeEvent<HTMLInputElement>) => void)
                  | undefined
              }
              value={(value || defaultValue) as Date | undefined}
            />
          )}
        </label>
      );
    }

    return (
      <label className={`flex flex-col gap-[5px] w-full ${labelClassName}`}>
        <p
          className={`${
            label ? 'pl-1 flex items-center gap-[5px] text-[14px]' : 'hidden'
          }`}
        >
          {label}{' '}
          {required && (
            <CustomTooltip
              label={required ? `${label} is required` : ''}
              labelClassName="text-[12px] bg-red-600"
            >
              <span className="text-red-600 cursor-pointer">*</span>
            </CustomTooltip>
          )}
        </p>

        <section className="relative w-full">
          {prefixIcon || prefixText ? (
            <label className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Link
                to={'#'}
                onClick={prefixIconHandler}
                className="text-secondary"
              >
                {prefixIcon && (
                  <FontAwesomeIcon className="text-current" icon={prefixIcon} />
                )}
                {prefixText && <p className="text-[14px]">{prefixText}</p>}
              </Link>
            </label>
          ) : null}

          {suffixIcon && (
            <Link
              to={'#'}
              onClick={suffixIconHandler}
              className={`absolute top-0 end-0 p-2.5 px-3.5 text-sm font-medium h-full rounded-e-lg border focus:outline-none ${
                suffixIconPrimary
                  ? 'bg-primary text-white border-primary border-l-none'
                  : 'border-background border-opacity-50 bg-white text-primary border-l-none'
              }`}
            >
              <FontAwesomeIcon icon={suffixIcon || faSearch} />
            </Link>
          )}

          {isLoading ? (
            <SkeletonLoader type="input" />
          ) : (
            <input
              defaultValue={defaultValue as string}
              value={value}
              type={type || 'text'}
              min={type === 'number' ? 0 : min}
              readOnly={readOnly}
              name={name}
              ref={ref}
              onChange={onChange}
              placeholder={readOnly ? '' : placeholder}
              className={`
                py-[7px] px-4 
                font-normal
                placeholder:!font-light
                placeholder:text-[13px] 
                text-[14px]
                flex items-center w-full
                rounded-lg border-[1.5px]
                border-gray-300 border-opacity-50
                outline-none focus:outline-none
                focus:border-[1.6px] focus:border-primary
                ease-in-out duration-50
                ${className}
                ${prefixIcon && 'ps-10'}
                ${prefixText ? 'ps-[3.6rem]' : ''}
                ${
                  readOnly &&
                  '!border-[.1px] !border-background hover:cursor-default focus:!border-background'
                }
              `}
            />
          )}
        </section>
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
