import Form from "@/components/forms/form";
import React from "react";
import SignupFields from "../signupFields";
import { IUseSignupResponse } from "../../hooks/useSignup";

interface Props {
  signupLogic: IUseSignupResponse;
}

export interface ISignupForm {
  name: string;
  email: string;
  password: string;
}

const initialValues: ISignupForm = {
  email: "",
  password: "",
  name: "",
};

const SignupForm = ({ signupLogic }: Props) => {
  const { isLoading, handleSubmit, validationSchema } = signupLogic;

  return (
    <>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <SignupFields formikProps={formikProps} isLoading={isLoading} />
        )}
      </Form>
    </>
  );
};

export default SignupForm;
