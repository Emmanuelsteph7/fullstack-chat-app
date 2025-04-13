import { useState } from "react";
import useForm from "../../../../hooks/useForm";
import { resetPasswordService } from "../../../../services/auth-service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../../utils/resolveAxiosError";
import { validateResetPasswordForm } from "../utils/validateResetPasswordForm";
import useDialog from "../../../../hooks/useDialog";

export interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const useResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams<{ token: string }>();
  const { dialogRef, handleDialogOpen } = useDialog();

  const {
    error,
    form,
    handleInputChange,
    handleResetForm,
    handleSetError,
    handleSubmit,
  } = useForm<IResetPasswordForm>({
    initialFormValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit,
  });

  async function onSubmit() {
    const isValidated = validateResetPasswordForm(form, handleSetError);
    if (!isValidated) return;

    try {
      setIsLoading(true);
      const res = await resetPasswordService({
        password: form.password,
        token: token || "",
      });

      if (res) {
        handleDialogOpen();
        handleResetForm();
      }
    } catch (error) {
      const jwtExpiresMessage = "jwt expired";
      const jwtMalformedMessage = "jwt malformed";
      const errMessage = resolveAxiosError(error).message;

      if (
        errMessage === jwtExpiresMessage ||
        errMessage === jwtMalformedMessage
      ) {
        toast.error(
          "This reset password link is expired. Kindly request new password link."
        );
      } else {
        toast.error(resolveAxiosError(error).message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { error, form, handleInputChange, isLoading, handleSubmit, dialogRef };
};

export default useResetPasswordForm;
