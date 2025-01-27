import { KeySquare, Mail } from "lucide-react";
import FormInput from "../../../../components/formInput";
import useLogin from "../../hooks/useLogin";
import Button from "../../../../components/button";
import { Link } from "react-router-dom";
import { Path } from "../../../../navigations/routes";

const LoginForm = () => {
  const { error, formValues, handleChange, handleSubmit, isLoginLoading } =
    useLogin();

  return (
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
        <Button label="Create Account" loading={isLoginLoading} fullWidth />
      </div>
      <p className="text-center">
        Don't have an account?
        <Link className="text-primary ml-1" to={Path.Signup}>
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
