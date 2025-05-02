import React from "react";
import { Link, LinkProps } from "expo-router";
import cs from "classnames";
import { fontFamily } from "@/constants/fontFamily";
import { ButtonSizeType, ButtonVariantType } from "../button";

interface Props extends LinkProps {
  variant?: ButtonVariantType;
  label: string;
  size?: ButtonSizeType;
  fullWidth?: boolean;
}

const ButtonLink = ({
  variant = "primary",
  className,
  label,
  size = "normal",
  fullWidth,
  disabled,
  ...otherProps
}: Props) => {
  return (
    <Link
      {...otherProps}
      className={cs(
        "rounded-3xl border-[3px] flex-row text-center items-center justify-center",
        {
          [`${className}`]: className,
          "bg-color-primary dark:bg-color-grey-dark border-color-primary dark:border-color-grey-light text-white":
            variant === "primary",
          "bg-white dark:bg-color-grey-light border-color-primary dark:border-color-grey-dark text-color-primary dark:text-white":
            variant === "primary-outline",
          "px-5 py-5": size === "normal",
          "px-4 py-3": size === "small",
          "w-full": fullWidth,
          "opacity-50": disabled,
        }
      )}
      style={{
        fontFamily: fontFamily[700],
      }}
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
