import { twMerge } from 'tailwind-merge';

interface Option {
  text: string,
  value: string
}

export interface SelectProps {
  className?: string,
  onChange: (value: string) => void,
  options: Option[],
  selected: string,
}

/**
 * Select Component to be used for making dropdown inputs in the form
 * @param props.className contains additional classes that should be added to the component
 * @param props.onChange contains a function to be executed if any value is changed/selected in the select
 * @param props.options contains list of options that are added in the dropdown
 * @param props.selected contains the value of the item that is selected
 */
export default function Select({
  className = '',
  onChange = () => {},
  options = [],
  selected
}: SelectProps) {
  return (
    <select data-testid='Select-form'
      onChange={(ev) => onChange(ev.target.value)}
      className={twMerge(`form-select h-full py-0 pl-2 pr-8 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${className}`)}
      value={selected}
    >
      {options.map((option, index) => (
        <option key={index} selected={option.value === selected} value={option.value} data-testid='Option-form'>
          {option.text}
        </option>
      ))}
    </select>
  );
}
