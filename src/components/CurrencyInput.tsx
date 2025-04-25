import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  placeholder?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  min,
  max,
  className,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    
    if (numericValue === '') {
      onChange(0);
      return;
    }
    
    const numberValue = Number(numericValue);
    
    if (min !== undefined && numberValue < min) {
      onChange(min);
      return;
    }
    
    if (max !== undefined && numberValue > max) {
      onChange(max);
      return;
    }
    
    onChange(numberValue);
  };

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
      <input
        type="text"
        value={value === 0 ? '' : formatCurrency(value, false)}
        onChange={handleChange}
        className={className}
        style={{ paddingLeft: '2rem' }}
        placeholder={placeholder}
      />
    </div>
  );
};