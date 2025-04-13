import { KeySquare } from "lucide-react";
import FormInput from "../../../../../components/formInput";
import useResetPasswordForm from "../../hooks/useResetPasswordForm";
import Button from "../../../../../components/button";
import Dialog from "../../../../../components/dialog";
import { Link } from "react-router-dom";
import { Path } from "../../../../../navigations/routes";

const ResetPasswordForm = () => {
  const { error, form, handleInputChange, dialogRef, handleSubmit, isLoading } =
    useResetPasswordForm();

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && (
          <span className="block text-[14px] text-center mb-2 text-red-400">
            {error}
          </span>
        )}
        <FormInput
          label="Password"
          icon={<KeySquare size={16} />}
          placeholder="Enter password"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={form.password}
        />
        <FormInput
          label="Confirm Password"
          icon={<KeySquare size={16} />}
          placeholder="Enter confirm password"
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
          value={form.confirmPassword}
        />
        <div className="mb-6 mt-4">
          <Button
            label="Reset password"
            type="submit"
            loading={isLoading}
            fullWidth
          />
        </div>
        <p className="text-center">
          <Link className="text-primary font-medium ml-1" to={Path.Login}>
            Go to login
          </Link>
        </p>
      </form>
      <Dialog ref={dialogRef}>
        <h3 className="text-[24px] mb-10 text-center font-semibold">
          Password reset successful
        </h3>
        <p className="mb-10 text-center">
          Congratulations, your password reset was successful
        </p>
        <div className="flex justify-center">
          <Link className="btn btn-primary" to={Path.Login}>
            Go to login
          </Link>
        </div>
      </Dialog>
    </>
  );
};

export default ResetPasswordForm;
