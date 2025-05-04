import * as yup from "yup";
import { Shape } from "@/validations/constants/shape";
import { ISignupForm } from "../components/signupForm";

export const signupSchema = () =>
  yup.object().shape<Shape<ISignupForm>>({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: yup
      .string()
      .min(6, "Password should be 6 or more characters")
      .required("Please enter password"),
    name: yup.string().required("Please enter name"),
  });
