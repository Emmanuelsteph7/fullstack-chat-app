import AuthLayoutContent from "../../../layouts/authLayout/components/authLayoutContent";
import SignupForm from "./components/signupForm";

const Signup = () => {
  return (
    <AuthLayoutContent
      header="Create Account"
      subHeader="Get started with your free account"
    >
      <SignupForm />
    </AuthLayoutContent>
  );
};

export default Signup;
