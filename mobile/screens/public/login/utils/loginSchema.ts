import * as yup from "yup";
import { Shape } from "@/validations/constants/shape";
import { ILoginForm } from "../components/loginForm";

export const loginSchema = () =>
  yup.object().shape<Shape<ILoginForm>>({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: yup.string().required("Please enter password"),
  });
