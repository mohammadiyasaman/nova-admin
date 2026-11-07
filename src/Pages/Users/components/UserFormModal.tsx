import { Formik, Form, ErrorMessage } from "formik";

import {
  Overlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  IconButton,
  FormGrid,
  FormField,
  FieldLabel,
  StyledField,
  FieldError,
  ModalActions,
  SecondaryButton,
  FormPrimaryButton as PrimaryButton,
  FormAlert as Alert,
} from "../UsersPage.styles";

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
