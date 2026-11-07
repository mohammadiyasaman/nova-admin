import * as Yup from "yup";
import type { Translation } from "@/Dictionary/translations";

type ProductValidationMessages = Pick<
  Translation,
  "required" | "invalidPrice" | "invalidImageUrl"
>;

export const getProductValidationSchema = (t: ProductValidationMessages) =>
  Yup.object({
    title: Yup.string().trim().required(t.required),

    price: Yup.number()
      .typeError(t.invalidPrice)
      .moreThan(0, t.invalidPrice)
      .required(t.required),

    description: Yup.string().trim().required(t.required),

    category: Yup.string().required(t.required),

    image: Yup.string().url(t.invalidImageUrl).required(t.required),
  });
