import React from 'react';
import { FieldState } from '../types/personData';

interface DynamicFieldProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'tel' | 'checkbox';
  fieldState: FieldState;
  onChange: (name: string, value: any) => void;
  onBlur: (name: string, value: any) => void;
  onFocus: (name: string, value: any) => void;
  className?: string;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({
  name,
  label,
  type,
  fieldState,
  onChange,
  onBlur,
  onFocus,
  className = ''
}) => {
  if (!fieldState.visible) {
    return null;
  }

  const baseInputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    ${fieldState.enabled ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}
    ${fieldState.error ? 'border-red-500' : 'border-gray-300'}
  `;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    onChange(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    onBlur(name, value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    onFocus(name, value);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={fieldState.value || false}
            disabled={!fieldState.enabled}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">{label}</span>
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={fieldState.value || ''}
          disabled={!fieldState.enabled}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={baseInputClasses}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
      
      {fieldState.error && (
        <p className="mt-1 text-sm text-red-600">{fieldState.error}</p>
      )}
    </div>
  );
};