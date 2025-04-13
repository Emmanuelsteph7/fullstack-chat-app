import { IResetPasswordForm } from "../hooks/useResetPasswordForm";

export const validateResetPasswordForm = (
  form: IResetPasswordForm,
  handleSetError: (msg: string) => void
) => {
  if (!form.password || !form.confirmPassword) {
    handleSetError("Please, fill all fields");
    return false;
  }

  if (form.password.length < 6) {
    handleSetError("Password should be 6 or more characters");
    return false;
  }

  if (form.password !== form.confirmPassword) {
    handleSetError("Passwords do not match");
    return false;
  }

  return true;
};
