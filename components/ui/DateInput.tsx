import React, { useRef } from 'react';
import { DateValue } from '../../types';

interface DateInputProps {
  value: DateValue;
  onChange: (value: DateValue) => void;
  hideYear?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, hideYear = false }) => {
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    onChange({ ...value, day: val });
    if (val.length === 2) monthRef.current?.focus();
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    onChange({ ...value, month: val });
    if (val.length === 2 && !hideYear) yearRef.current?.focus();
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    onChange({ ...value, year: val });
  };

  const inputClasses = "w-full text-center p-3 text-2xl font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 rounded-2xl outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none";

  return (
    <div className="flex gap-3 w-full max-w-sm mx-auto">
      <div className="flex-1">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 text-center uppercase tracking-wider">Day</label>
        <input
          ref={dayRef}
          type="tel"
          placeholder="DD"
          value={value.day}
          onChange={handleDayChange}
          className={inputClasses}
        />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 text-center uppercase tracking-wider">Month</label>
        <input
          ref={monthRef}
          type="tel"
          placeholder="MM"
          value={value.month}
          onChange={handleMonthChange}
          className={inputClasses}
        />
      </div>
      {!hideYear && (
        <div className="flex-[1.5]">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 text-center uppercase tracking-wider">Year</label>
          <input
            ref={yearRef}
            type="tel"
            placeholder="YYYY"
            value={value.year}
            onChange={handleYearChange}
            className={inputClasses}
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;