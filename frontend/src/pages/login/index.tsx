import AuthLayoutContent from "../../layouts/authLayout/components/authLayoutContent";
import LoginForm from "./components/loginForm";

const Login = () => {
  return (
    <AuthLayoutContent
      header="Welcome back"
      subHeader="Sign in to your account"
      title="Welcome back!"
      paragraph="Sign in to continue your conversations and catch up with your messages"
    >
      <LoginForm />
    </AuthLayoutContent>
  );
};

export default Login;
