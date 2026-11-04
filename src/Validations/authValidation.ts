import * as Yup from "yup";

export const getLoginValidationSchema = (isFa: boolean) =>
  Yup.object({
    username: Yup.string()
      .trim()
      .required(
        isFa ? "وارد کردن نام کاربری الزامی است." : "Username is required",
      ),

    password: Yup.string().required(
      isFa ? "وارد کردن رمز عبور الزامی است." : "Password is required",
    ),
  });
