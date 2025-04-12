import { KeySquare, Mail } from "lucide-react";
import FormInput from "../../../../components/formInput";
import useLogin from "../../hooks/useLogin";
import Button from "../../../../components/button";
import { Link } from "react-router-dom";
import { Path } from "../../../../navigations/routes";
import OtpDialog from "../../../signup/components/otpDialog";

const LoginForm = () => {
  const {
    error,
    form,
    handleInputChange,
    handleSubmit,
    dialogRef,
    isLoginLoading,
  } = useLogin();

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && (
          <span className="block text-[14px] text-center mb-2 text-red-400">
            {error}
          </span>
        )}
        <FormInput
          label="Email"
          icon={<Mail size={16} />}
          placeholder="Enter email"
          type="email"
          name="email"
          onChange={handleInputChange}
          value={form.email}
        />
        <FormInput
          label="Password"
          icon={<KeySquare size={16} />}
          placeholder="Enter password"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={form.password}
        />
        <div className="mb-6 mt-4">
          <Button
            label="Login"
            type="submit"
            loading={isLoginLoading}
            fullWidth
          />
        </div>
        <p className="text-center">
          Don't have an account?
          <Link className="text-primary ml-1" to={Path.Signup}>
            Sign up
          </Link>
        </p>
      </form>
      <OtpDialog
        email={form.email}
        signUpMessage="Login Successful!"
        ref={dialogRef}
      />
    </>
  );
};

export default LoginForm;
