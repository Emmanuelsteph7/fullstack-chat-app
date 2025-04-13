import { Mail } from "lucide-react";
import FormInput from "../../../../../components/formInput";
import useForgotPasswordForm from "../../hooks/useForgotPasswordForm";
import Button from "../../../../../components/button";
import { Link } from "react-router-dom";
import { Path } from "../../../../../navigations/routes";

const ForgotPasswordForm = () => {
  const { error, form, handleInputChange, handleSubmit, isLoading } =
    useForgotPasswordForm();

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
        onChange={handleInputChange}
        value={form.email}
      />
      <div className="mb-6 mt-4">
        <Button
          label="Request reset link"
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
  );
};

export default ForgotPasswordForm;
