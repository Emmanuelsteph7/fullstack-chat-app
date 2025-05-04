import BackIcon from "@/components/backIcon";
import Container from "@/components/container";
import CustomStatusBar from "@/components/customStatusBar";
import KeyboardAvoidingWrapper from "@/components/keyboardAvoidingWrapper";
import Typography from "@/components/typography";
import { darkGradientColors, lightGradientColors } from "@/constants/color";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, View } from "react-native";
import ForgotPasswordForm from "./components/forgotPasswordForm";
import useForgotPassword from "./hooks/useForgotPassword";
import OtpSheet from "@/components/otpSheet";
import ResetPasswordSheet from "./components/resetPasswordSheet";

const ForgotPasswordScreen = () => {
  const forgotPasswordLogic = useForgotPassword();

  const {
    handleOtpChange,
    otp,
    bottomSheetRef,
    handleModalClose,
    handleVerifyAccount,
    isVerifyLoading,
    isResetPasswordLoading,
    resetPasswordSheetRef,
    handleResetPasswordModalClose,
    handleResetPassword,
  } = forgotPasswordLogic;

  const { colorScheme } = useColorScheme();

  const gradientColors =
    colorScheme === "dark" ? darkGradientColors : lightGradientColors;

  return (
    <CustomStatusBar>
      <KeyboardAvoidingWrapper>
        <LinearGradient
          colors={gradientColors as any}
          style={{
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container className="py-10 justify-between flex-1">
              <BackIcon />
              <View className="flex-1 pt-[20px] pb-[20px]">
                <Typography variant="headline-4" weight={700}>
                  Forgot
                </Typography>
                <Typography
                  variant="headline-4"
                  className="text-color-primary dark:text-color-primary-dark mb-5"
                  weight={700}
                >
                  Password?
                </Typography>
                <Typography variant="body-small" className="mb-8">
                  Sign in to access amazing features and connect with your
                  family and loved ones.
                </Typography>
                <ForgotPasswordForm forgotPasswordLogic={forgotPasswordLogic} />
              </View>
              <View className="flex-row justify-center gap-2 mt-8">
                <Link push href="/(public)/sign-up">
                  <Typography
                    className="text-color-primary dark:text-color-primary-dark"
                    weight={700}
                  >
                    Go to Login
                  </Typography>
                </Link>
              </View>
            </Container>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingWrapper>
      <OtpSheet
        header="Enter OTP"
        description="An email has been sent to you. Kindly fill in the otp to verify."
        handleAction={handleVerifyAccount}
        handleClose={handleModalClose}
        handleOtpChange={handleOtpChange}
        isLoading={isVerifyLoading}
        ref={bottomSheetRef}
        otpValue={otp}
      />
      <ResetPasswordSheet
        isLoading={isResetPasswordLoading}
        ref={resetPasswordSheetRef}
        handleClose={handleResetPasswordModalClose}
        handleResetPassword={handleResetPassword}
      />
    </CustomStatusBar>
  );
};

export default ForgotPasswordScreen;
