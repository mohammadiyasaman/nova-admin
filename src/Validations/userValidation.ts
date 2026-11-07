import * as Yup from "yup";

type UserValidationMessages = {
  required: string;
  invalidEmail: string;
  invalidUsername: string;
  invalidPassword: string;
  firstNameRequired: string;
  lastNameRequired: string;
  phoneRequired: string;
  cityRequired: string;
  streetRequired: string;
  buildingNumberNumeric: string;
  buildingNumberInteger: string;
  buildingNumberMin: string;
  zipCodeRequired: string;
};

export const getUserValidationSchema = (t: UserValidationMessages) =>
  Yup.object({
    email: Yup.string().email(t.invalidEmail).required(t.required),

    username: Yup.string().min(3, t.invalidUsername).required(t.required),

    password: Yup.string().min(6, t.invalidPassword).required(t.required),

    name: Yup.object({
      firstname: Yup.string().required(t.firstNameRequired),
      lastname: Yup.string().required(t.lastNameRequired),
    }),

    phone: Yup.string().required(t.phoneRequired),

    address: Yup.object({
      city: Yup.string().required(t.cityRequired),
      street: Yup.string().required(t.streetRequired),

      number: Yup.number()
        .typeError(t.buildingNumberNumeric)
        .integer(t.buildingNumberInteger)
        .min(1, t.buildingNumberMin)
        .required(t.required),

      zipcode: Yup.string().required(t.zipCodeRequired),
    }),
  });
