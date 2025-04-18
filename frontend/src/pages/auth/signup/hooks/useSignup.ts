import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateSignUpForm } from "../utils/validateSignupForm";
import useForm from "../../../../hooks/useForm";
import useDialog from "../../../../hooks/useDialog";
import { signUpService } from "../../../../services/auth-service";
import { resolveAxiosError } from "../../../../utils/resolveAxiosError";
import { Path } from "../../../../navigations/routes";

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const { form, handleInputChange, handleSubmit, error, handleSetError } =
    useForm<ISignUpForm>({
      initialFormValues: {
        name: "",
        email: "",
        password: "",
      },
      onSubmit,
    });

  const { dialogRef, handleDialogClose, handleDialogOpen } = useDialog();

  const navigate = useNavigate();

  async function onSubmit() {
    const isValidated = validateSignUpForm(form, handleSetError);
    if (!isValidated) return;

    try {
      setIsSignupLoading(true);
      const res = await signUpService(form);

      if (res) {
        toast.success(res.message);
        handleDialogOpen();
      }
    } catch (error) {
      const userExistsMessage = "User already exists";
      const errMessage = resolveAxiosError(error).message;
      toast.error(resolveAxiosError(error).message);

      if (errMessage === userExistsMessage) {
        navigate(`${Path.Login}?email=${form.email}`);
      }
    } finally {
      setIsSignupLoading(false);
    }
  }

  return {
    handleSubmit,
    error,
    isSignupLoading,
    dialogRef,
    handleDialogOpen,
    handleDialogClose,
    form,
    handleInputChange,
  };
};

export default useSignup;
