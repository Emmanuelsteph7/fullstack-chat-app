import { IOtpDialogForm } from "../hooks/useOtpDialog";

export const validateOtpDialogFormForm = (
  form: IOtpDialogForm,
  handleSetError: (msg: string) => void
) => {
  if (!form.otp) {
    handleSetError("Please enter OTP");
    return false;
  }

  if (form.otp.length !== 6) {
    handleSetError("OTP must be 6 characters");
    return false;
  }

  return true;
};
