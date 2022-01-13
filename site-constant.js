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
    confirmPpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  }),
};

export const forgetPassword = {
  schema: Yup.object({
    email: Yup.string().email("Invalid email format").required(),
  }),
};

export const resetPassword = {
  schema: Yup.object({
    password: Yup.string().required(),
    confirmPpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  }).required(),
};

export const changePassword = {
  schema: Yup.object({
    oldPassword: Yup.string().required(),
    password: Yup.string().required(),
    confirmPpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  }).required(),
};

export const registerBusinessForm = {
  schema: Yup.object({
    name: Yup.string().required(),
    reg_no: Yup.string().min(5).required(),
    owner_name: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().email("Invalid email format"),
    employee_no: Yup.number()
      .typeError("No. of Employee must be a number")
      .required(),
    lga: Yup.string().required(),
    business_type: Yup.string().required(),
    business_structure: Yup.string().required(),
    address: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required(),
  }),
};

export const generateInvoiceForm = {
  schema: Yup.object({
    business_id: Yup.string().min(9).required("business_id field is require"),
    name: Yup.string().required(),
    address: Yup.string().typeError().required(),
    lga: Yup.string().required(),
    state: Yup.string().required(),
    tax_item_id: Yup.string().required(),
    mda_id: Yup.string().required(),
    amount: Yup.string().required(),
  }),
};
