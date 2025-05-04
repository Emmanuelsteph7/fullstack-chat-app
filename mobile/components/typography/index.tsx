import { Text, TextProps } from "react-native";
import React from "react";
import cs from "classnames";
import { fontFamily } from "@/constants/fontFamily";
import Animated from "react-native-reanimated";

export type TypographyVariant =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "paragraph"
  | "paragraph-md"
  | "body"
  | "body-small"
  | "body-x-small";

const classes: Record<TypographyVariant, string> = {
  "headline-1": "text-[48px]",
  "headline-2": "text-[40px]",
  "headline-3": "text-[34px]",
  "headline-4": "text-[28px]",
  "headline-5": "text-[20px]",
  paragraph: "text-[18px]",
  "paragraph-md": "text-[16px]",
  body: "text-[14px]",
  "body-small": "text-[12px]",
  "body-x-small": "text-[10px]",
};

interface Props extends TextProps {
  variant?: TypographyVariant;
  weight?: 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  shouldAnimate?: boolean;
  entering?: any;
  exiting?: any;
}

/* istanbul ignore next */
const Typography = ({
  variant = "body",
  className,
  children,
  weight = 400,
  entering,
  shouldAnimate,
  exiting,
  ...otherProps
}: Props) => {
  const baseClass = className?.includes("text-color")
    ? `${classes[variant]}`
    : `text-color-text dark:text-white ${classes[variant]}`;

  return (
    <>
      {shouldAnimate && (
        <Animated.Text
          testID="text"
          {...otherProps}
          className={cs(baseClass, {
            [`${className}`]: className,
          })}
          style={[{ fontFamily: fontFamily[weight] }, otherProps.style]}
          entering={entering}
          exiting={exiting}
        >
          {children}
        </Animated.Text>
      )}
      {!shouldAnimate && (
        <Text
          testID="text"
          {...otherProps}
          className={cs(baseClass, {
            [`${className}`]: className,
          })}
          style={[{ fontFamily: fontFamily[weight] }, otherProps.style]}
        >
          {children}
        </Text>
      )}
    </>
  );
};

export default Typography;
