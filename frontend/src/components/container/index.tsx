import { ReactNode } from "react";
import cs from "classnames";

interface Props {
  children?: ReactNode;
  className?: string;
  variant?: "normal" | "fluid";
}

const Container = ({ children, className, variant = "normal" }: Props) => {
  return (
    <div
      className={cs("mx-auto", {
        [`${className}`]: className,
        "w-[90%] max-w-[1400px]": variant === "normal",
        "w-[95%] max-w-[2000px]": variant === "fluid",
      })}
    >
      {children}
    </div>
  );
};

export default Container;
