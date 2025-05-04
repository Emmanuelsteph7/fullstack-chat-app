import React, { forwardRef } from "react";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { View } from "react-native";
import OtpField from "@/components/otpField";
import BottomSheet from "@/components/bottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface Props {
  header: string;
  description: string;
  handleOtpChange: (text: string) => void;
  isLoading: boolean;
  handleClose: () => void;
  handleAction: () => void;
  otpValue: string;
}

// eslint-disable-next-line react/display-name
const OtpSheet = forwardRef<BottomSheetMethods, Props>(
  (
    {
      description,
      handleAction,
      handleClose,
      handleOtpChange,
      header,
      isLoading,
      otpValue,
    },
    ref
  ) => {
    return (
      <BottomSheet
        header={header}
        enablePanDownToClose={!isLoading}
        backdropPressBehaviour={isLoading ? "none" : "close"}
        ref={ref}
      >
        <Typography className="text-center max-w-[300px] mb-5 mx-auto">
          {description}
        </Typography>
        <View className="mb-10">
          <OtpField
            numberOfDigits={6}
            handleTextChange={handleOtpChange}
            otpValue={otpValue}
          />
        </View>
        <View className="w-full max-w-[300px] mx-auto">
          <Button
            label="Verify"
            isLoading={isLoading}
            className="mb-3"
            onPress={handleAction}
          />
          <Button
            label="Close"
            variant="primary-outline"
            onPress={handleClose}
            disabled={isLoading}
          />
        </View>
      </BottomSheet>
    );
  }
);

export default OtpSheet;
