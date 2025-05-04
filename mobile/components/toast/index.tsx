import { View } from "react-native";
import React, { forwardRef, useEffect } from "react";
import Typography from "../typography";
import { useToastStore } from "@/store/useToastStore";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import cs from "classnames";
import ToastSuccessIcon from "@/assets/svgs/toast-success-icon.svg";
import ToastWarningIcon from "@/assets/svgs/toast-warning-icon.svg";
import ToastErrorIcon from "@/assets/svgs/toast-error-icon.svg";
import ToastInfoIcon from "@/assets/svgs/toast-info-icon.svg";
import { useColorScheme } from "nativewind";

// eslint-disable-next-line react/display-name
const Toast = forwardRef(() => {
  const _toastTopAnimation = useSharedValue(-100);
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  const {
    description,
    title,
    type,
    isShown,
    toastTopAnimation,
    handleUpdateSharedValue,
  } = useToastStore();

  useEffect(() => {
    if (!toastTopAnimation) {
      handleUpdateSharedValue(_toastTopAnimation, insets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_toastTopAnimation, handleUpdateSharedValue, toastTopAnimation]);

  const animatedTopStyle = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation?.value,
    };
  });

  if (!isShown) return <></>;

  return (
    <Animated.View
      style={animatedTopStyle}
      className={cs(
        "absolute px-[25px] py-[8px] mx-[15px] rounded-full flex-row items-center flex-1 self-center shadow-black elevation",
        {
          "bg-[#d1fae5] dark:bg-[#065f46]": type === "success",
          "bg-[#fee2e2] dark:bg-[#7f1d1d]": type === "error",
          "bg-[#fef9c3] dark:bg-[#78350f]": type === "warning",
          "bg-[#e0f2fe] dark:bg-[#0c4a6e]": type === "info",
        }
      )}
    >
      <View>
        {type === "success" && (
          <ToastSuccessIcon
            width={25}
            height={25}
            color={colorScheme === "dark" ? "#d1fae5" : "#065f46"}
          />
        )}
        {type === "warning" && (
          <ToastWarningIcon
            width={25}
            height={25}
            color={colorScheme === "dark" ? "#fef9c3" : "#92400e"}
          />
        )}
        {type === "error" && (
          <ToastErrorIcon
            width={25}
            height={25}
            color={colorScheme === "dark" ? "#fef9c3" : "#991b1b"}
          />
        )}
        {type === "info" && (
          <ToastInfoIcon
            width={25}
            height={25}
            color={colorScheme === "dark" ? "#e0f2fe" : "#0c4a6e"}
          />
        )}
      </View>
      <View className="flex-col px-3 mx-[5px]">
        <Typography
          variant="paragraph-md"
          weight={700}
          className={cs("", {
            "!text-[#065f46] dark:!text-[#d1fae5]": type === "success",
            "!text-[#92400e] dark:!text-[#fef9c3]": type === "warning",
            "!text-[#991b1b] dark:!text-[#fee2e2]": type === "error",
            "!text-[#0c4a6e] dark:!text-[#e0f2fe]": type === "info",
          })}
        >
          {title}
        </Typography>
        <Typography
          variant="body-small"
          weight={500}
          className={cs("", {
            "!text-[#065f46] dark:!text-[#d1fae5]": type === "success",
            "!text-[#92400e] dark:!text-[#fef9c3]": type === "warning",
            "!text-[#991b1b] dark:!text-[#fee2e2]": type === "error",
            "!text-[#0c4a6e] dark:!text-[#e0f2fe]": type === "info",
          })}
        >
          {description}
        </Typography>
      </View>
    </Animated.View>
  );
});

export default Toast;
