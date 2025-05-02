import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import cs from "classnames";

interface Props {
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const Container = ({ children, className, style }: Props) => {
  return (
    <View
      style={style}
      className={cs("px-[20px]", {
        [`${className}`]: className,
      })}
    >
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
