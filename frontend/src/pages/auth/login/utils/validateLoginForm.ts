import { emailRegex } from "../../../../constants/regex";
import { ILoginForm } from "../hooks/useLogin";

export const validateLoginForm = (
  form: ILoginForm,
  handleSetError: (msg: string) => void
) => {
  if (!form.email || !form.password) {
    handleSetError("Please, fill all fields");
    return false;
  }

  if (!form.email.match(emailRegex)) {
    handleSetError("Email is invalid");
    return false;
  }

  return true;
};
