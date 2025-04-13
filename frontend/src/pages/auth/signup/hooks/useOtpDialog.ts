import { useState } from "react";
import { toast } from "react-toastify";
import { validateOtpDialogFormForm } from "../utils/validateOtpDialogForm";
import { useAuthStore } from "../../../../store/useAuthStore";
import useForm from "../../../../hooks/useForm";
import { verifyOtpService } from "../../../../services/auth-service";
import { resolveAxiosError } from "../../../../utils/resolveAxiosError";

interface IUseOtpDialogOptions {
  email: string;
  signUpMessage: string;
}

export interface IOtpDialogForm {
  otp: string;
}

const useOtpDialog = ({ email, signUpMessage }: IUseOtpDialogOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const { error, form, handleInputChange, handleSetError, handleSubmit } =
    useForm<IOtpDialogForm>({
      initialFormValues: {
        otp: "",
      },
      onSubmit,
    });

  const { handleLoginSuccess } = useAuthStore();

  async function onSubmit() {
    const isValidated = validateOtpDialogFormForm(form, handleSetError);
    if (!isValidated) return;

    try {
      setIsLoading(true);
      const res = await verifyOtpService({ email, otp: form.otp });

      if (res) {
        handleLoginSuccess(res.data, signUpMessage);
      }
    } catch (error) {
      toast.error(resolveAxiosError(error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return { form, error, handleInputChange, isLoading, handleSubmit };
};

export default useOtpDialog;
