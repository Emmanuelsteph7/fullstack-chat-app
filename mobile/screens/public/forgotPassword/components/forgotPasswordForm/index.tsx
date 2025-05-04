import React from "react";
import Form from "@/components/forms/form";
import ForgotPasswordFields from "../forgotPasswordFields";
import { IUseForgotPasswordResponse } from "../../hooks/useForgotPassword";

interface Props {
  forgotPasswordLogic: IUseForgotPasswordResponse;
}

export interface IForgotPasswordForm {
  email: string;
}

const initialValues: IForgotPasswordForm = {
  email: "",
};

const ForgotPasswordForm = ({ forgotPasswordLogic }: Props) => {
  const { isLoading, handleSubmit, validationSchema } = forgotPasswordLogic;

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formikProps) => (
        <ForgotPasswordFields formikProps={formikProps} isLoading={isLoading} />
      )}
    </Form>
  );
};

export default ForgotPasswordForm;
