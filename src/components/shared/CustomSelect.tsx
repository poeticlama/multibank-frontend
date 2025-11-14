import { useState, useRef, useEffect } from 'react';

export type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  onChange?: (value: string) => void;
};

const CustomSelect = ({ options, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(options[0] || null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className='relative w-64'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex justify-between items-center text-xs font-semibold px-4 py-2 bg-blue-50 border border-blue-300 text-blue-800 rounded-xl shadow-sm hover:bg-blue-100 transition'
      >
        <span>{selected ? selected.label : 'Выберите...'}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {isOpen && (
        <ul className='absolute left-0 top-full mt-1 w-full bg-white border border-blue-200 rounded-xl shadow-lg z-50 max-h-60 overflow-auto'>
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 text-xs ${
                selected?.value === option.value ? 'bg-blue-50 font-medium' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
