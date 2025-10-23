import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  text: string;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 active:scale-95 transition-all",
  secondary: "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all",
};

const defaultStyles =
  "px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center shadow-md hover:shadow-lg cursor-pointer";

export const Button = ({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  disabled,
  className,
}: ButtonProps) => {
  const isDisabled = loading || disabled;

  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${
        fullWidth ? "w-full" : ""
      } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
      disabled={isDisabled}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {loading ? "Loading..." : text}
    </button>
  );
};
