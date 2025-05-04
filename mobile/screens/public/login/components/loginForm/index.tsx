import React, { useEffect, useState } from "react";
import Form from "@/components/forms/form";
import LoginFields from "../loginFields";
import { loginSchema } from "../../utils/loginSchema";
import { loginService } from "@/services/auth-service";
import { useToastStore } from "@/store/useToastStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useLocalSearchParams } from "expo-router";

export interface ILoginForm {
  email: string;
  password: string;
}

const defailtValues: ILoginForm = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<ILoginForm>(defailtValues);

  const { handleLoginSuccess } = useAuthStore();
  const { handleSuccessToast } = useToastStore();

  const { email } = useLocalSearchParams<{ email: string }>();

  useEffect(() => {
    if (email) {
      setInitialValues((prev) => ({
        ...prev,
        email,
      }));
    }
  }, [email]);

  const handleSubmit = async (values: ILoginForm) => {
    try {
      setIsLoading(true);

      const res = await loginService(values);

      handleLoginSuccess(res.data);
      handleSuccessToast({ description: res.message });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = loginSchema();

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formikProps) => (
        <LoginFields formikProps={formikProps} isLoading={isLoading} />
      )}
    </Form>
  );
};

export default LoginForm;
