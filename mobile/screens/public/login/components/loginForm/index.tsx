import { View } from "react-native";
import React from "react";
import Form from "@/components/forms/form";
import LoginFields from "../loginFields";
import { loginSchema } from "../../utils/loginSchema";

export interface ILoginForm {
  email: string;
  password: string;
}

const initialValues: ILoginForm = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const handleSubmit = (values: ILoginForm) => {};

  const validationSchema = loginSchema();

  return (
    <View>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => <LoginFields formikProps={formikProps} />}
      </Form>
    </View>
  );
};

export default LoginForm;
