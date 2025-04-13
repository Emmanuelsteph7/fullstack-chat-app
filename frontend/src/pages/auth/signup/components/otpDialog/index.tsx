import { forwardRef } from "react";
import useOtpDialog from "../../hooks/useOtpDialog";
import Dialog from "../../../../../components/dialog";
import FormInput from "../../../../../components/formInput";
import Button from "../../../../../components/button";

interface Props {
  email: string;
  signUpMessage?: string;
}

const OtpDialog = forwardRef<HTMLDialogElement, Props>(
  ({ email, signUpMessage = "Sign up successful!" }, ref) => {
    const { error, form, handleInputChange, handleSubmit, isLoading } =
      useOtpDialog({ email, signUpMessage });

    return (
      <Dialog ref={ref}>
        <h3 className="text-[24px] mb-10 font-semibold">Enter OTP</h3>
        <p className="mb-5">
          To verify your email, an otp was sent to {email}. Kindly enter OTP
        </p>
        {error && <p className="text-error text-[14px] text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormInput
            name="otp"
            label="OTP"
            onChange={handleInputChange}
            value={form.otp}
          />
          <div>
            <Button
              label="Verify Email"
              loading={isLoading}
              type="submit"
              fullWidth
            />
          </div>
        </form>
      </Dialog>
    );
  }
);

export default OtpDialog;
