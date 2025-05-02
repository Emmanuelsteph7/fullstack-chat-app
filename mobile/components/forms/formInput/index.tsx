import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode, useState } from "react";
import cs from "classnames";
import EyeIcon from "@/assets/svgs/eye.svg";
import EyeSlashIcon from "@/assets/svgs/eye-slash.svg";
import { ErrorMessage, useField } from "formik";
import Typography from "@/components/typography";
import { useColorScheme } from "nativewind";
import { colors } from "@/constants/color";

interface Props extends TextInputProps {
  label: string;
  name: string;
  containerClasses?: string;
  isLoading?: boolean;
  showEyeToggle?: boolean;
  extraDetails?: ReactNode;
  iconRight?: (color: string) => ReactNode;
}

const FormInput = ({
  label,
  name,
  autoCapitalize = "none",
  containerClasses,
  isLoading,
  secureTextEntry = false,
  showEyeToggle,
  extraDetails,
  iconRight,
  ...inputProps
}: Props) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const { colorScheme } = useColorScheme();

  const [{ value, onBlur, onChange }, { touched, error }, { setTouched }] =
    useField(name);

  const handleToggleSecure = () => setIsSecure((prev) => !prev);

  const handleBlur = () => {
    onBlur(name);
    setTouched(true, true);
  };

  const isInvalid = touched && !!error;
  const primaryColor =
    colorScheme === "dark"
      ? colors["color-primary-dark"]
      : colors["color-primary"];
  const errorColor =
    colorScheme === "dark" ? colors["color-error-dark"] : colors["color-error"];
  const iconDefaultColor =
    colorScheme === "dark" ? colors["color-grey-light"] : colors["color-text"];
  const iconColor = isInvalid
    ? errorColor
    : !!value
    ? primaryColor
    : iconDefaultColor;

  return (
    <View
      className={cs("mb-3", {
        [`${containerClasses}`]: containerClasses,
      })}
    >
      <Typography
        weight={500}
        className={cs({
          "opacity-30": isLoading,
        })}
      >
        {label}
        {isLoading && " (Loading...)"}
      </Typography>
      <View
        className={cs("px-6 py-4 my-1 border-[3px] relative rounded-3xl", {
          "border-color-primary/40 dark:border-color-primary-dark": !!value,
          "border-color-text/40 dark:border-color-grey-light": !value,
          "!border-color-error/40 dark:!border-color-error-dark/40": isInvalid,
        })}
      >
        <TextInput
          {...inputProps}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#3f3f3d5e"
          editable={!isLoading}
          secureTextEntry={isSecure}
          value={value}
          onChangeText={onChange(name)}
          onBlur={() => handleBlur()}
          className={cs(
            "py-1 text-color-text dark:text-white text-[14px] text-grey-content-1",
            {
              "opacity-30": isLoading,
              [`${inputProps.className}`]: inputProps.className,
            }
          )}
        />
        {iconRight && (
          <View className="absolute right-6 bottom-[15px]">
            {iconRight(iconColor)}
          </View>
        )}
        {showEyeToggle && (
          <TouchableOpacity
            activeOpacity={0.6}
            className="absolute right-6 bottom-[15px]"
            onPress={handleToggleSecure}
          >
            {!isSecure && <EyeIcon width={22} height={22} color={iconColor} />}
            {isSecure && (
              <EyeSlashIcon width={22} height={22} color={iconColor} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {extraDetails && (
        <Text className="text-accent-purple-border">{extraDetails}</Text>
      )}
      <ErrorMessage
        name={name}
        render={(errorMessage) => (
          <Typography className="text-color-error/80 dark:text-color-error-dark">
            {errorMessage}
          </Typography>
        )}
      />
    </View>
  );
};

export default FormInput;
