import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Typography from "../typography";
import { colors } from "@/constants/color";
import { useColorScheme } from "nativewind";

interface Props {
  handleTextChange: (text: string) => void;
  numberOfDigits?: number;
  otpValue: string;
}

const OtpField = ({
  handleTextChange,
  numberOfDigits = 4,
  otpValue,
}: Props) => {
  const { colorScheme } = useColorScheme();

  const ref = useBlurOnFulfill({ value: otpValue, cellCount: numberOfDigits });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: handleTextChange,
  });

  return (
    <View className="w-max mx-auto justify-center">
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={otpValue}
        onChangeText={handleTextChange}
        cellCount={numberOfDigits}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        autoFocus
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }: any) => (
          <Typography
            key={index}
            style={[
              styles.cell,
              isFocused && styles.focusCell,
              {
                backgroundColor:
                  colorScheme === "dark" ? colors["color-dark"] : "#ffffff",
                borderColor:
                  colorScheme === "dark"
                    ? colors["color-grey-light"]
                    : colors["color-primary-dark"],
              },
            ]}
            onLayout={getCellOnLayoutHandler(index)}
            className="text-color-primary dark:text-white"
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Typography>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 10, gap: 10 },
  cell: {
    width: 45,
    height: 48,
    lineHeight: 44,
    fontSize: 24,
    textAlign: "center",
    borderRadius: 6,
    borderWidth: 1,
    // IOS
    shadowColor: "#022150",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  focusCell: {
    borderColor: "#0221508a",
    borderWidth: 2,
  },
});

export default OtpField;
