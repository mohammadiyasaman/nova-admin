import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { loginUser } from "@/Redux/Slices/authThunks";
import { getLoginValidationSchema } from "@/Validations/authValidation";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";

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
          {isFa ? "English" : "فارسی"}
        </LanguageButton>

        <LoginHeader>
          <h1>NOVA Admin</h1>
          <p>
            {isFa ? "به حساب کاربری خود وارد شوید" : "Sign in to your account"}
          </p>
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
                  placeholder={
                    isFa ? "نام کاربری خود را وارد کنید" : "Enter your username"
                  }
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
                  placeholder={
                    isFa ? "رمز عبور خود را وارد کنید" : "Enter your password"
                  }
                />

                <ErrorMessage name="password" component={ErrorText} />
              </FormGroup>

              {error && <ErrorText>{error}</ErrorText>}

              <SubmitButton type="submit" disabled={loading || isSubmitting}>
                {loading
                  ? isFa
                    ? "در حال ورود..."
                    : "Signing in..."
                  : t.signIn}
              </SubmitButton>
            </StyledForm>
          )}
        </Formik>
      </LoginCard>
    </Wrapper>
  );
};

export default LoginPage;

// Styles

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f3f5f8;
  box-sizing: border-box;
`;

const LoginCard = styled.section`
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 28px 22px;
  }
`;

const LanguageButton = styled.button`
  display: block;
  margin-left: auto;
  margin-bottom: 20px;
  padding: 7px 13px;
  border: 1px solid #d8dce3;
  border-radius: 6px;
  background: #fff;
  color: #142b4a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #f58220;
    color: #f58220;
  }
`;

const LoginHeader = styled.div`
  text-align: center;

  h1 {
    margin: 0 0 8px;
    color: #142b4a;
    font-size: 28px;
  }

  p {
    margin: 0 0 28px;
    color: #777;
    font-size: 14px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #142b4a;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid #d8dce3;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #f58220;
    }

    &::placeholder {
      color: #aaa;
    }
  }
`;

const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 13px;
  border: none;
  border-radius: 6px;
  background: #142b4a;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #203e64;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
