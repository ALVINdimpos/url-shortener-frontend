import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChangeEvent, useState } from 'react';
import moment from 'moment';
import Select from './Select';
import { formatDate } from '@/helpers/strings.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

type DatePickerProps = {
  value: Date | undefined;
  onChange: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  selectionType?: 'date' | 'month' | 'year' | 'recurringDate' | undefined;
  fromDate?: Date;
  placeholder?: string;
  toDate?: Date;
  disabled?: boolean;
};

const DatePicker = ({
  onChange,
  value = undefined,
  selectionType,
  fromDate = undefined,
  placeholder = 'Select date',
  toDate = undefined,
  disabled = false,
}: DatePickerProps) => {
  // SET MONTH AND YEAR
  const [year, setYear] = useState<string | undefined>(moment().format('YYYY'));
  const [defaultMonth, setDefaultMonth] = useState<string | undefined>(
    moment().toISOString()
  );
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal py-2 h-[40px]',
            !value && 'text-muted-foreground'
          )}
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2" />
          {value ? (
            selectionType === 'recurringDate' ? (
              moment(value).format('MMMM DD')
            ) : !['date', 'month', 'year'].includes(String(selectionType)) ? (
              formatDate(value)
            ) : (
              formatDate(value)
            )
          ) : (
            <p className="text-[15px] text-secondary">{placeholder}</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <menu className="flex flex-col w-full gap-2 p-2">
          <ul
            className={`w-full grid gap-3 p-0 ${
              selectionType === 'recurringDate' ? 'grid-cols-1' : 'grid-cols-2'
            }`}
          >
            {selectionType !== 'recurringDate' && (
              <Select
                className="!h-8"
                placeholder="Year"
                onChange={(e) => {
                  setYear(e);
                  setDefaultMonth(moment(e, 'YYYY-MM-DD').toISOString());
                }}
                value={year}
                options={Array.from({ length: 200 }, (_, i) => ({
                  value: String(2099 - i),
                  label: String(2099 - i),
                }))}
              />
            )}
            <Select
              className="!h-8"
              placeholder="Month"
              onChange={(e) => {
                setDefaultMonth(moment(`${year}-${e}`, 'YYYY-MM-DD').toISOString());
              }}
              value={moment(defaultMonth).format('MM')}
              options={Array.from({ length: 12 }, (_, i) => ({
                value: String(i + 1).padStart(2, '0'),
                label: moment().month(i).format('MMM'),
              }))}
            />
          </ul>
          <Calendar
            fromDate={fromDate}
            toDate={toDate}
            mode="single"
            month={defaultMonth ? new Date(defaultMonth) : undefined}
            onMonthChange={(e) => {
              if (selectionType !== 'recurringDate') {
                setDefaultMonth(e.toISOString());
              }
            }}
            selected={value}
            onSelect={(e) => {
              if (e) {
                if (onChange) {
                  onChange(e.toISOString() as unknown as ChangeEvent<HTMLInputElement>);
                }
                setOpen(false);
              }
            }}
            initialFocus
          />
        </menu>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
