import { useState } from "react";
import useForm from "../../../../hooks/useForm";
import { validateForgotPasswordForm } from "../utils/validateForgotPasswordForm";
import { forgotPasswordService } from "../../../../services/auth-service";
import { resolveAxiosError } from "../../../../utils/resolveAxiosError";
import { toast } from "react-toastify";

export interface IForgotPasswordForm {
  email: string;
}

const useForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    error,
    form,
    handleInputChange,
    handleResetForm,
    handleSetError,
    handleSubmit,
  } = useForm<IForgotPasswordForm>({
    initialFormValues: {
      email: "",
    },
    onSubmit,
  });

  async function onSubmit() {
    const isValidated = validateForgotPasswordForm(form, handleSetError);
    if (!isValidated) return;

    try {
      setIsLoading(true);
      const res = await forgotPasswordService(form);

      if (res) {
        handleResetForm();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(resolveAxiosError(error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, form, handleInputChange, handleSubmit };
};

export default useForgotPasswordForm;
