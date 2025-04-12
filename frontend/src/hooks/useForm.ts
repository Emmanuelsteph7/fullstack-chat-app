import React, { useState } from "react";

interface IUseFormOptions<T> {
  initialFormValues: T;
  onSubmit: (form: T) => void;
}

const useForm = <T>({ initialFormValues, onSubmit }: IUseFormOptions<T>) => {
  const [form, setForm] = useState(initialFormValues);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleUpdateForm = (form: T) => {
    setForm(form);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleResetForm = () => {
    setForm(initialFormValues);
  };

  const handleSetError = (msg: string) => {
    setError(msg);
  };

  return {
    handleInputChange,
    handleSubmit,
    form,
    handleInputCheckboxChange,
    handleResetForm,
    handleSetError,
    error,
    handleUpdateForm,
  };
};

export default useForm;
