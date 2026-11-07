import styled from "styled-components";
import { Form } from "formik";

export const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f3f5f8;
  box-sizing: border-box;
`;

export const LoginCard = styled.section`
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

export const LanguageButton = styled.button`
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

export const LoginHeader = styled.div`
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

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
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

export const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 12px;
`;

export const SubmitButton = styled.button`
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
