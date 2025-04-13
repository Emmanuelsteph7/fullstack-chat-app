import AuthLayoutContent from "../../../layouts/authLayout/components/authLayoutContent";
import LoginForm from "./components/loginForm";

const Login = () => {
  return (
    <AuthLayoutContent
      header="Welcome back"
      subHeader="Sign in to your account"
    >
      <LoginForm />
    </AuthLayoutContent>
  );
};

export default Login;
