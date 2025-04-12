import React from "react";
import cs from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = ({
  label,
  variant = "primary",
  className,
  fullWidth,
  type = "button",
  loading,
  ...otherProps
}: Props) => {
  return (
    <button
      disabled={loading}
      className={cs("btn", {
        [`${className}`]: className,
        "btn-primary": variant === "primary",
        "btn-secondary": variant === "secondary",
        "w-full": fullWidth,
        "cursor-not-allowed": loading,
      })}
      {...otherProps}
      type={type}
    >
      {loading && "Loading..."}
      {!loading && label}
    </button>
  );
};

export default Button;
