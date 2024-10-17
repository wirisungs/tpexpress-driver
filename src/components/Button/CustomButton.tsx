import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick }) => {
  const baseClasses = "px-5 py-4 text-xl font-semibold border border-red-700 border-solid";
  const variantClasses = {
    primary: "text-white bg-red-700 rounded-none",
    secondary: "text-red-700 rounded-3xl bg-opacity-0 bg-red-700",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;