import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { loginUser } from "@/Redux/Slices/authThunks";
import { getLoginValidationSchema } from "@/Validations/authValidation";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";

import {
  Wrapper,
  LoginCard,
  LanguageButton,
  LoginHeader,
  StyledForm,
  FormGroup,
  ErrorText,
  SubmitButton,
} from "./LoginPage.styles";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const { language, toggleLanguage, t } = useAdminUI();

  const isFa = language === "fa";
  const validationSchema = getLoginValidationSchema(isFa);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Wrapper dir={isFa ? "rtl" : "ltr"}>
      <LoginCard>
        <LanguageButton type="button" onClick={toggleLanguage} dir="ltr">
          {isFa ? t.switchToEnglish : t.switchToPersian}
        </LanguageButton>

        <LoginHeader>
          <h1>NOVA Admin</h1>
          <p>{t.loginSubtitle}</p>
        </LoginHeader>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const result = await dispatch(loginUser(values));

            if (loginUser.fulfilled.match(result)) {
              navigate("/dashboard", { replace: true });
            }
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <FormGroup>
                <label htmlFor="username">{t.username}</label>

                <Field
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder={t.usernamePlaceholder}
                />

                <ErrorMessage name="username" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <label htmlFor="password">{t.password}</label>

                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t.passwordPlaceholder}
                />

                <ErrorMessage name="password" component={ErrorText} />
              </FormGroup>

              {error && <ErrorText>{error}</ErrorText>}

              <SubmitButton type="submit" disabled={loading || isSubmitting}>
                {loading ? t.signingIn : t.signIn}
              </SubmitButton>
            </StyledForm>
          )}
        </Formik>
      </LoginCard>
    </Wrapper>
  );
};

export default LoginPage;
