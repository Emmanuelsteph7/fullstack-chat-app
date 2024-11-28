import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useSignup = () => {
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSignupLoading } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidate = () => {
    if (!formValues.email || !formValues.name || !formValues.password) {
      setError("Please, fill all fields");
      return false;
    }

    if (!formValues.email.match(emailRegex)) {
      setError("Email is invalid");
      return false;
    }

    if (formValues.password.length < 6) {
      setError("Password should be 6 or more characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidated = handleValidate();

    if (isValidated) {
      await signup(formValues);
    }
  };

  return { handleSubmit, handleChange, formValues, error, isSignupLoading };
};

export default useSignup;
