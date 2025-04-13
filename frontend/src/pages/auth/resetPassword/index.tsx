import AuthLayoutContent from "../../../layouts/authLayout/components/authLayoutContent";
import ResetPasswordForm from "./components/resetPasswordForm";

const ResetPassword = () => {
  return (
    <AuthLayoutContent
      header="Reset password"
      subHeader="Kindly reset your password"
    >
      <ResetPasswordForm />
    </AuthLayoutContent>
  );
};

export default ResetPassword;
