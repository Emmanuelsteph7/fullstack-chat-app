import { useRef, useState } from "react";
import { signUpService } from "../../../services/auth-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../utils/resolveAxiosError";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState<ISignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleDialogClose = () => {
    dialogRef.current?.close();
  };

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

    if (!isValidated) return;

    try {
      setIsSignupLoading(true);
      const res = await signUpService(formValues);

      if (res) {
        toast.success(res.message);
        handleDialogOpen();
      }
    } catch (error) {
      const userExistsMessage = "User already exists";
      const errMessage = resolveAxiosError(error).message;
      toast.error(resolveAxiosError(error).message);

      if (errMessage === userExistsMessage) {
        navigate(`${Path.Login}?email=${formValues.email}`);
      }
    } finally {
      setIsSignupLoading(false);
    }
  };

  return {
    handleSubmit,
    handleChange,
    formValues,
    error,
    isSignupLoading,
    dialogRef,
    handleDialogOpen,
    handleDialogClose,
  };
};

export default useSignup;
