import { View } from "react-native";
import React from "react";
import { FormikProps } from "formik";
import FormInput from "@/components/forms/formInput";
import Button from "@/components/button";
import EnvelopeIcon from "@/assets/svgs/envelope.svg";
import { IForgotPasswordForm } from "../forgotPasswordForm";

interface Props {
  isLoading: boolean;
  formikProps: FormikProps<IForgotPasswordForm>;
}

const ForgotPasswordFields = ({ formikProps, isLoading }: Props) => {
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
      <View className="mt-5">
        <Button
          label="Initiate reset"
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordFields;
