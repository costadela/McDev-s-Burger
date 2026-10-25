import React from "react";

const Input = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-neutral-700 bg-amber-50 px-3 py-2 text-sm text-gray-900 transition-colors outline-none focus:border-amber-500 ${className}`}
    />
  );
};

export default Input;
