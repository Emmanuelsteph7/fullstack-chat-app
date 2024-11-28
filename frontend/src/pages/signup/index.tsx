import SignupForm from "./components/signupForm";
import AuthLayoutContent from "../../layouts/authLayout/components/authLayoutContent";

const Signup = () => {
  return (
    <AuthLayoutContent
      header="Create Account"
      subHeader="Get started with your free account"
      title="Join our community"
      paragraph="Connect with friends, share moments and stay in touch with your loved
          ones."
    >
      <SignupForm />
    </AuthLayoutContent>
  );
};

export default Signup;
