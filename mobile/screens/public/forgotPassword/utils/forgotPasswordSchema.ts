import * as yup from "yup";
import { Shape } from "@/validations/constants/shape";
import { IForgotPasswordForm } from "../components/forgotPasswordForm";

export const forgotPasswordSchema = () =>
  yup.object().shape<Shape<IForgotPasswordForm>>({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter email"),
  });
