import React, { ReactNode, useState } from "react";
import cs from "classnames";
import { Eye, EyeClosed } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

const FormInput = ({
  label,
  className,
  type = "text",
  icon,
  ...otherProps
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(true);
  const handleHidePassword = () => setShowPassword(false);

  const isPassword = type === "password";
  return (
    <label className="mb-3 block">
      <span className="mb-1 inline-block">{label}</span>
      <div className="input input-bordered flex items-center gap-2">
        {icon && <span className="h-4 w-4 opacity-70">{icon}</span>}
        <input
          type={showPassword ? "text" : type}
          className={cs("grow", {
            [`${className}`]: className,
          })}
          {...otherProps}
        />
        {isPassword && (
          <span className="h-4 w-4 opacity-70">
            {showPassword && (
              <button
                type="button"
                className="z-[2]"
                onClick={handleHidePassword}
              >
                <Eye size={16} />
              </button>
            )}
            {!showPassword && (
              <button
                type="button"
                className="z-[2]"
                onClick={handleShowPassword}
              >
                <EyeClosed size={16} />
              </button>
            )}
          </span>
        )}
      </div>
    </label>
  );
};

export default FormInput;
