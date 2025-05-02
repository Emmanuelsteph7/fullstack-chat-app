import { TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import Typography from "../typography";
import cs from "classnames";

export type ButtonVariantType = "primary" | "primary-outline";
export type ButtonSizeType = "normal" | "small";

interface Props {
  onPress?: () => void;
  label: string;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  className?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  testID?: string;
  disabled?: boolean;
  rightIcon?: ReactNode;
}

const Button = ({
  onPress,
  label,
  variant = "primary",
  className,
  isLoading,
  fullWidth,
  size = "normal",
  testID = "button",
  disabled,
  rightIcon,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      testID={testID}
      onPress={onPress}
      activeOpacity={0.7}
      className={cs(
        "rounded-3xl border-[3px] flex-row items-center justify-center",
        {
          [`${className}`]: className,
          "bg-color-primary dark:bg-color-grey-dark border-color-primary dark:border-color-grey-light text-white":
            variant === "primary",
          "bg-white dark:bg-color-grey-light border-color-primary dark:border-color-grey-dark text-color-primary dark:text-white":
            variant === "primary-outline",
          "px-5 py-5": size === "normal",
          "px-4 py-3": size === "small",
          "w-full": fullWidth,
          "opacity-50": disabled || isLoading,
        }
      )}
    >
      <Typography
        weight={700}
        testID="button-text"
        variant={size === "normal" ? "body" : "body-small"}
        className={cs("text-center", {
          "text-white": variant === "primary",
        })}
      >
        {isLoading ? "Loading..." : label}
      </Typography>
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default Button;
