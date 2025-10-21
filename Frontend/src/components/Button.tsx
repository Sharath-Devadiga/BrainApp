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
  primary: "bg-purple-600 text-white hover:bg-purple-700 transition-colors",
  secondary: "bg-purple-200 text-purple-600 hover:bg-purple-300 transition-colors",
};

const defaultStyles =
  "px-4 py-2 rounded-lg font-medium flex items-center justify-center shadow-md cursor-pointer";

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
