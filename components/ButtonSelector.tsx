import React from 'react';

interface ButtonSelectorProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const ButtonSelector: React.FC<ButtonSelectorProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            className={`px-4 py-2 rounded-full text-md font-medium transition-colors duration-200 ease-in-out  ${
                isActive
                    ? 'bg-primary text-white'
                    : 'text-primary'
            }`}
            onClick={onClick}
            aria-pressed={isActive}
        >
            {label}
        </button>
    );
};

export default ButtonSelector;

