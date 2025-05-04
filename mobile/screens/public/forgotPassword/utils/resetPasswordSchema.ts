import * as yup from "yup";
import { Shape } from "@/validations/constants/shape";
import { IResetPasswordForm } from "../components/resetPasswordForm";

export const resetPasswordSchema = () =>
  yup.object().shape<Shape<IResetPasswordForm>>({
    password: yup
      .string()
      .min(6, "Password should be 6 or more characters")
      .required("Please enter password"),
    confirmPassword: yup
      .string()
      .required("Please confirm your pin")
      .oneOf([yup.ref("password")], "Pins must match"),
  });
