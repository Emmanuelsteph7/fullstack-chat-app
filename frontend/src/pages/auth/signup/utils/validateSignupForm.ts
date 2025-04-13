import { emailRegex } from "../../../../constants/regex";
import { ISignUpForm } from "../hooks/useSignup";

export const validateSignUpForm = (
  form: ISignUpForm,
  handleSetError: (msg: string) => void
) => {
  if (!form.email || !form.name || !form.password) {
    handleSetError("Please, fill all fields");
    return false;
  }

  if (!form.email.match(emailRegex)) {
    handleSetError("Email is invalid");
    return false;
  }

  if (form.password.length < 6) {
    handleSetError("Password should be 6 or more characters");
    return false;
  }

  return true;
};
