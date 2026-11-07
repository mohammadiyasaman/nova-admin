import * as Yup from "yup";

type ProductValidationMessages = {
  required: string;
  invalidPrice: string;
  invalidImageUrl: string;
};

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
