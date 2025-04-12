import { forwardRef, useState } from "react";
import Dialog from "../../../../components/dialog";
import FormInput from "../../../../components/formInput";
import Button from "../../../../components/button";
import { verifyOtpService } from "../../../../services/auth-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../../utils/resolveAxiosError";
import { useAuthStore } from "../../../../store/useAuthStore";

interface Props {
  email: string;
  signUpMessage?: string;
}

const OtpDialog = forwardRef<HTMLDialogElement, Props>(
  ({ email, signUpMessage = "Sign up successful!" }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({
      otp: "",
    });

    const { handleLoginSuccess } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formValues.otp) {
        setError("Please enter OTP");
        return;
      }

      if (formValues.otp.length !== 6) {
        setError("OTP must be 6 characters");
        return;
      }

      try {
        setIsLoading(true);
        const res = await verifyOtpService({ email, otp: formValues.otp });

        if (res) {
          handleLoginSuccess(res.data, signUpMessage);
        }
      } catch (error) {
        toast.error(resolveAxiosError(error).message);
      } finally {
        setIsLoading(false);
      }
    };

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
            onChange={handleChange}
            value={formValues.otp}
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
