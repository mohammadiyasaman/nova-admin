import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";

import { getUserValidationSchema } from "@/Validations/userValidation";
import type { CreateUserPayload } from "@/types/user";

type UserFormLabels = {
  addNewUser: string;
  close: string;
  createUserError: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  street: string;
  buildingNumber: string;
  zipCode: string;
  cancel: string;
  creatingUser: string;
  createUser: string;
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

type UserFormModalProps = {
  isFa: boolean;
  error?: string | null;
  isCreating: boolean;
  labels: UserFormLabels;
  onClose: () => void;
  onSubmit: (
    values: CreateUserPayload,
    helpers: { resetForm: () => void },
  ) => Promise<void>;
};

const initialValues: CreateUserPayload = {
  email: "",
  username: "",
  password: "",
  name: {
    firstname: "",
    lastname: "",
  },
  address: {
    city: "",
    street: "",
    number: 1,
    zipcode: "",
  },
  phone: "",
};

export function UserFormModal({
  isFa,
  error,
  isCreating,
  labels,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const validationSchema = getUserValidationSchema(labels);

  return (
    <Overlay>
      <ModalContent dir={isFa ? "rtl" : "ltr"}>
        <ModalHeader>
          <ModalTitle>{labels.addNewUser}</ModalTitle>
          <IconButton type="button" onClick={onClose} aria-label={labels.close}>
            ×
          </IconButton>
        </ModalHeader>

        {error && <Alert>{error}</Alert>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGrid>
                <FormField>
                  <FieldLabel>{labels.firstName}</FieldLabel>
                  <StyledField
                    name="name.firstname"
                    placeholder={labels.firstName}
                  />
                  <ErrorMessage name="name.firstname" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.lastName}</FieldLabel>
                  <StyledField
                    name="name.lastname"
                    placeholder={labels.lastName}
                  />
                  <ErrorMessage name="name.lastname" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.username}</FieldLabel>
                  <StyledField name="username" placeholder={labels.username} />
                  <ErrorMessage name="username" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.email}</FieldLabel>
                  <StyledField
                    name="email"
                    type="email"
                    placeholder={labels.email}
                  />
                  <ErrorMessage name="email" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.password}</FieldLabel>
                  <StyledField
                    name="password"
                    type="password"
                    placeholder={labels.password}
                  />
                  <ErrorMessage name="password" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.phone}</FieldLabel>
                  <StyledField name="phone" placeholder={labels.phone} />
                  <ErrorMessage name="phone" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.city}</FieldLabel>
                  <StyledField name="address.city" placeholder={labels.city} />
                  <ErrorMessage name="address.city" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.street}</FieldLabel>
                  <StyledField
                    name="address.street"
                    placeholder={labels.street}
                  />
                  <ErrorMessage name="address.street" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.buildingNumber}</FieldLabel>
                  <StyledField
                    name="address.number"
                    type="number"
                    min="1"
                    placeholder={labels.buildingNumber}
                  />
                  <ErrorMessage name="address.number" component={FieldError} />
                </FormField>

                <FormField>
                  <FieldLabel>{labels.zipCode}</FieldLabel>
                  <StyledField
                    name="address.zipcode"
                    placeholder={labels.zipCode}
                  />
                  <ErrorMessage name="address.zipcode" component={FieldError} />
                </FormField>
              </FormGrid>

              <ModalActions>
                <SecondaryButton type="button" onClick={onClose}>
                  {labels.cancel}
                </SecondaryButton>
                <PrimaryButton
                  type="submit"
                  disabled={isCreating || isSubmitting}
                >
                  {isCreating || isSubmitting
                    ? labels.creatingUser
                    : labels.createUser}
                </PrimaryButton>
              </ModalActions>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 24px;
  background: rgb(0 0 0 / 55%);
`;

const ModalContent = styled.div`
  width: min(100%, 680px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 20px 60px rgb(0 0 0 / 20%);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 700;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 22px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
`;

const StyledField = styled(Field)`
  width: 100%;
  min-height: 42px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 13px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const FieldError = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 11px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

const SecondaryButton = styled.button`
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 11px 18px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Alert = styled.div`
  margin-bottom: 16px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;
