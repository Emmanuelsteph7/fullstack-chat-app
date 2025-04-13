import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSearchParams } from "react-router-dom";
import { loginService } from "../../../../services/auth-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../../utils/resolveAxiosError";
import useForm from "../../../../hooks/useForm";
import { validateLoginForm } from "../utils/validateLoginForm";
import useDialog from "../../../../hooks/useDialog";

export interface ILoginForm {
  email: string;
  password: string;
}

const useLogin = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const {
    error,
    form,
    handleInputChange,
    handleUpdateForm,
    handleSubmit,
    handleSetError,
  } = useForm<ILoginForm>({
    initialFormValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  const [searchParams] = useSearchParams();
  const { handleLoginSuccess } = useAuthStore();

  const { dialogRef, handleDialogOpen } = useDialog();

  const emailQuery = searchParams.get("email");

  useEffect(() => {
    if (emailQuery) {
      handleUpdateForm({
        ...form,
        email: emailQuery,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit() {
    const isValidated = validateLoginForm(form, handleSetError);
    if (!isValidated) return;

    try {
      setIsLoginLoading(true);
      const res = await loginService(form);

      if (res) {
        handleLoginSuccess(res.data, "Login Successful!");
      }
    } catch (error) {
      const notVerifiedUserMessage = "Kindly verify your email address";
      const errMessage = resolveAxiosError(error).message;

      toast.error(resolveAxiosError(error).message);

      if (errMessage === notVerifiedUserMessage) {
        handleDialogOpen();
      }
    } finally {
      setIsLoginLoading(false);
    }
  }

  return {
    handleSubmit,
    handleInputChange,
    form,
    error,
    isLoginLoading,
    dialogRef,
  };
};

export default useLogin;
