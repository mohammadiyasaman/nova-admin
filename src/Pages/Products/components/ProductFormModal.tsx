import { Formik } from "formik";
import { getProductValidationSchema } from "@/Validations/productValidation";
import type { FormikHelpers } from "formik";
import type { CreateProductPayload } from "@/types/product";
import {
  CloseButton,
  ErrorBanner,
  FieldError,
  FormActions,
  FormGroup,
  FormLabel,
  Modal,
  ModalHeader,
  Overlay,
  PrimaryButton,
  SecondaryButton,
  StyledField,
  StyledForm,
} from "../ProductsPage.styles";

type ProductFormModalProps = {
  isOpen: boolean;
  initialValues: CreateProductPayload;
  validationSchema: ReturnType<typeof getProductValidationSchema>;
  categories: string[];
  createError: string | null;
  t: {
    addNewProduct: string;
    close: string;
    productTitle: string;
    price: string;
    category: string;
    allCategories: string;
    imageUrl: string;
    description: string;
    cancel: string;
    saveProduct: string;
    savingProduct: string;
  };
  onClose: () => void;
  onSubmit: (
    values: CreateProductPayload,
    helpers: FormikHelpers<CreateProductPayload>,
  ) => void | Promise<void>;
};

function ProductFormModal({
  isOpen,
  initialValues,
  validationSchema,
  categories,
  createError,
  t,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <h2>{t.addNewProduct}</h2>

          <CloseButton type="button" onClick={onClose} aria-label={t.close}>
            ×
          </CloseButton>
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <FormGroup>
                <FormLabel>{t.productTitle}</FormLabel>
                <StyledField name="title" />
                <FieldError name="title" component="div" />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t.price}</FormLabel>
                <StyledField
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                />
                <FieldError name="price" component="div" />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t.category}</FormLabel>

                <StyledField as="select" name="category">
                  <option value="">{t.allCategories}</option>

                  {categories.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </StyledField>

                <FieldError name="category" component="div" />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t.imageUrl}</FormLabel>
                <StyledField name="image" />
                <FieldError name="image" component="div" />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t.description}</FormLabel>
                <StyledField as="textarea" name="description" rows={4} />
                <FieldError name="description" component="div" />
              </FormGroup>

              {createError && (
                <ErrorBanner role="alert">{createError}</ErrorBanner>
              )}

              <FormActions>
                <SecondaryButton type="button" onClick={onClose}>
                  {t.cancel}
                </SecondaryButton>

                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t.savingProduct : t.saveProduct}
                </PrimaryButton>
              </FormActions>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </Overlay>
  );
}

export default ProductFormModal;
