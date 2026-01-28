import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}

function Button({ children, className, onClick, disabled }: ButtonProps) {
  return (
    <p>
      <button
        className={`${className} cursor-pointer transition-all duration-300`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </p>
  );
}

export default Button;
