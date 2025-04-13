import AuthLayoutContent from "../../../layouts/authLayout/components/authLayoutContent";
import ForgotPasswordForm from "./components/forgotPasswordForm";

const ForgotPassword = () => {
  return (
    <AuthLayoutContent
      header="Forgot password"
      subHeader="Enter your email to begin"
    >
      <ForgotPasswordForm />
    </AuthLayoutContent>
  );
};

export default ForgotPassword;
