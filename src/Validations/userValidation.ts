import * as Yup from "yup";
import type { Translation } from "@/Dictionary/translations";

type UserValidationMessages = Pick<
  Translation,
  | "required"
  | "invalidEmail"
  | "invalidUsername"
  | "invalidPassword"
  | "firstNameRequired"
  | "lastNameRequired"
  | "phoneRequired"
  | "cityRequired"
  | "streetRequired"
  | "buildingNumberNumeric"
  | "buildingNumberInteger"
  | "buildingNumberMin"
  | "zipCodeRequired"
>;

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
