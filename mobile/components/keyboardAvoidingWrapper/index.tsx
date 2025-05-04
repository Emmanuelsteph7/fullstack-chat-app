import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import cs from "classnames";

interface Props {
  children?: ReactNode;
  className?: string;
}

const KeyboardAvoidingWrapper = ({ children, className }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      className={cs("flex-1", {
        [`${className}`]: className,
      })}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
