import { View } from "react-native";
import React from "react";
import FormInput from "@/components/forms/formInput";
import Button from "@/components/button";
import { FormikProps } from "formik";
import { ISignupForm } from "../signupForm";
import EnvelopeIcon from "@/assets/svgs/envelope.svg";
import PersonIcon from "@/assets/svgs/person.svg";

interface Props {
  isLoading: boolean;
  formikProps: FormikProps<ISignupForm>;
}

const SignupFields = ({ formikProps, isLoading }: Props) => {
  const { handleSubmit } = formikProps;
  return (
    <View>
      <FormInput
        label="Name"
        name="name"
        iconRight={(color) => (
          <PersonIcon width={22} height={22} color={color} />
        )}
      />
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
      <View className="mt-5">
        <Button label="Sign up" isLoading={isLoading} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default SignupFields;
