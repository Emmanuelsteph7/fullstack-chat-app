import FormInput from "../../../../components/formInput";
import { KeySquare, Mail, User } from "lucide-react";
import Button from "../../../../components/button";
import { Link } from "react-router-dom";
import { Path } from "../../../../navigations/routes";
import useSignup from "../../hooks/useSignup";
import OtpDialog from "../otpDialog";

const SignupForm = () => {
  const {
    error,
    formValues,
    handleChange,
    handleSubmit,
    dialogRef,
    isSignupLoading,
  } = useSignup();

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && (
          <span className="block text-[14px] text-center mb-2 text-red-400">
            {error}
          </span>
        )}
        <FormInput
          label="Full Name"
          icon={<User size={16} />}
          placeholder="Enter full name"
          name="name"
          onChange={handleChange}
          value={formValues.name}
        />
        <FormInput
          label="Email"
          icon={<Mail size={16} />}
          placeholder="Enter email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />
        <FormInput
          label="Password"
          icon={<KeySquare size={16} />}
          placeholder="Enter password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formValues.password}
        />
        <div className="mb-6 mt-4">
          <Button
            label="Create Account"
            type="submit"
            loading={isSignupLoading}
            fullWidth
          />
        </div>
        <p className="text-center">
          Already have an account?
          <Link className="text-primary ml-1" to={Path.Login}>
            Sign in
          </Link>
        </p>
      </form>
      <OtpDialog ref={dialogRef} email={formValues.email} />
    </>
  );
};

export default SignupForm;
