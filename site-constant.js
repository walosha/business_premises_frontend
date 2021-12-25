import * as Yup from "yup";

export const signInform = {
  schema: Yup.object({
    email: Yup.string().email("Invalid email format").required(),
    password: Yup.string().required(),
  }),
};

export const registerForm = {
  schema: Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email("Invalid email format").required(),
    password: Yup.string().required(),
  }),
};
