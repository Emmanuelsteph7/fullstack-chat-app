import { View } from "react-native";
import React from "react";
import { FormikProps } from "formik";
import { ILoginForm } from "../loginForm";
import FormInput from "@/components/forms/formInput";
import Button from "@/components/button";
import EnvelopeIcon from "@/assets/svgs/envelope.svg";
import { Link } from "expo-router";
import Typography from "@/components/typography";

interface Props {
  isLoading: boolean;
  formikProps: FormikProps<ILoginForm>;
}

const LoginFields = ({ formikProps, isLoading }: Props) => {
  const { handleSubmit } = formikProps;

  return (
    <View>
      <FormInput
        label="Email"
        name="email"
        iconRight={(color) => (
          <EnvelopeIcon width={22} height={22} color={color} />
        )}
      />
      <FormInput
        label="Password"
        secureTextEntry
        showEyeToggle
        name="password"
      />
      <Link
        className="w-max ml-auto mb-5"
        href="/(public)/forgot-password"
        asChild
      >
        <Typography
          variant="body"
          weight={700}
          className="text-color-primary dark:text-color-primary-dark"
        >
          Forgot Password
        </Typography>
      </Link>
      <View className="mt-5">
        <Button label="Sign in" isLoading={isLoading} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default LoginFields;
