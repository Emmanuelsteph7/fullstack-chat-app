import Button from "@/components/button";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import React from "react";
import { View } from "react-native";
import { resetPasswordSchema } from "../../utils/resetPasswordSchema";

interface Props {
  isLoading: boolean;
  handleClose: () => void;
  handleResetPassword: (values: IResetPasswordForm) => Promise<void>;
}

export interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const initialValues: IResetPasswordForm = {
  confirmPassword: "",
  password: "",
};

const ResetPasswordForm = ({
  isLoading,
  handleClose,
  handleResetPassword,
}: Props) => {
  const validationSchema = resetPasswordSchema();

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
    >
      {({ handleSubmit }) => (
        <View className="w-full max-w-[400px] mx-auto">
          <FormInput
            label="Password"
            showEyeToggle
            name="password"
            secureTextEntry
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            secureTextEntry
            showEyeToggle
          />
          <View className="w-full max-w-[400px] mt-5 mx-auto">
            <Button
              label="Reset Password"
              className="mb-3"
              onPress={handleSubmit}
              isLoading={isLoading}
            />
            <Button
              label="Close"
              variant="primary-outline"
              onPress={handleClose}
              disabled={isLoading}
            />
          </View>
        </View>
      )}
    </Form>
  );
};

export default ResetPasswordForm;
