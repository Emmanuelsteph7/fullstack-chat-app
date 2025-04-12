import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useSearchParams } from "react-router-dom";
import { loginService } from "../../../services/auth-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../utils/resolveAxiosError";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useLogin = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [searchParams] = useSearchParams();
  const { handleLoginSuccess } = useAuthStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const emailQuery = searchParams.get("email");

  useEffect(() => {
    if (emailQuery) {
      setFormValues((prev) => ({
        ...prev,
        email: emailQuery,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

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

    if (!isValidated) return;

    try {
      setIsLoginLoading(true);
      const res = await loginService(formValues);

      if (res) {
        handleLoginSuccess(res.data, "Login Successful!");
      }
    } catch (error) {
      const notVerifiedUserMessage = "Kindly verify your email address";
      const errMessage = resolveAxiosError(error).message;

      toast.error(resolveAxiosError(error).message);

      if (errMessage === notVerifiedUserMessage) {
        handleDialogOpen();
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  return {
    handleSubmit,
    handleChange,
    formValues,
    error,
    isLoginLoading,
    dialogRef,
  };
};

export default useLogin;
