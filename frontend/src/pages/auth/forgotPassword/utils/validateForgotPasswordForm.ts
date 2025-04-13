import { emailRegex } from "../../../../constants/regex";
import { IForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export const validateForgotPasswordForm = (
  form: IForgotPasswordForm,
  handleSetError: (msg: string) => void
) => {
  if (!form.email) {
    handleSetError("Please, fill all fields");
    return false;
  }

  if (!form.email.match(emailRegex)) {
    handleSetError("Email is invalid");
    return false;
  }

  return true;
};
