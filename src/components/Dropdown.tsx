import React, { useState } from 'react';

interface DropdownProps {
  options: Array<'TODO' | 'IN_PROGRESS' | 'COMPLETED'>; // Specific literals
  onSelect: (option: 'TODO' | 'IN_PROGRESS' | 'COMPLETED') => void; // Specific literals
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: 'TODO' | 'IN_PROGRESS' | 'COMPLETED') => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-100 rounded-md focus:outline-none"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="px-4 py-2 font-semibold text-sm text-blue-500 border-b border-gray-300 bg-blue-50 rounded-t-lg">
            Change Status
          </div>
          {options.map((option, index) => (
            <button
              key={index}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left ${
                index !== options.length - 1 ? 'border-b border-gray-300' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
