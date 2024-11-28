import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useLogin = () => {
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { login, isLoginLoading } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidate = () => {
    if (!formValues.email || !formValues.password) {
      setError("Please, fill all fields");
      return false;
    }

    if (!formValues.email.match(emailRegex)) {
      setError("Email is invalid");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidated = handleValidate();

    if (isValidated) {
      await login(formValues);
    }
  };

  return { handleSubmit, handleChange, formValues, error, isLoginLoading };
};

export default useLogin;
