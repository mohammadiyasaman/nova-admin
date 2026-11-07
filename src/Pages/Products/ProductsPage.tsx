import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
} from "@/Redux/Slices/productThunks";
import { productService } from "@/Utils/services/productService";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";
import { getProductValidationSchema } from "@/Validations/productValidation";
import type { CreateProductPayload, Product } from "@/types/product";

const PAGE_SIZE = 8;

const initialValues: CreateProductPayload = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
};

function ProductsPage() {
  const dispatch = useAppDispatch();
  const { t } = useAdminUI();

  const products = useAppSelector((state) => state.products.items);
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct,
  );
  const loading = useAppSelector((state) => state.products.loading);
  const errors = useAppSelector((state) => state.products.error);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = getProductValidationSchema(t);

  // Fetch products
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Fetch categories
  useEffect(() => {
    let isActive = true;

    productService
      .getCategories()
      .then((data) => {
        if (isActive) {
          setCategories(data);
        }
      })
      .catch(() => {
        // If the request fails, categories are derived from the products list.
      });

    return () => {
      isActive = false;
    };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory = !category || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sort]);

  const availableCategories = useMemo(
    () =>
      categories.length > 0
        ? categories
        : [...new Set(products.map((item) => item.category))],
    [categories, products],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleCreateProduct = async (
    values: CreateProductPayload,
    { resetForm, setSubmitting }: FormikHelpers<CreateProductPayload>,
  ) => {
    try {
      await dispatch(createProduct(values)).unwrap();

      setSuccessMessage(t.productCreated);
      setIsFormOpen(false);
      resetForm();
      setCurrentPage(1);
    } catch {
      // The request error is stored in Redux.
    } finally {
      setSubmitting(false);
    }
  };

  const handleDetails = async (product: Product) => {
    setDetailsOpen(true);

    try {
      await dispatch(fetchProductById(product.id)).unwrap();
    } catch {
      // The product information from the list remains available.
    }
  };

  const closeDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <Page>
      <PageHeader>
        <div>
          <Title>{t.productsTitle}</Title>
          <Subtitle>{t.productsSubtitle}</Subtitle>
        </div>

        <PrimaryButton
          type="button"
          onClick={() => {
            setSuccessMessage("");
            setIsFormOpen(true);
          }}
        >
          + {t.addProduct}
        </PrimaryButton>
      </PageHeader>

      {successMessage && (
        <SuccessBanner role="status">
          {successMessage}
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label={t.close}
          >
            ×
          </button>
        </SuccessBanner>
      )}

      <Toolbar>
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          placeholder={t.productsSearch}
          aria-label={t.productsSearch}
        />

        <Select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setCurrentPage(1);
          }}
          aria-label={t.allCategories}
        >
          <option value="">{t.allCategories}</option>

          {availableCategories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
            setCurrentPage(1);
          }}
          aria-label={t.sortBy}
        >
          <option value="default">{t.sortDefault}</option>
          <option value="price-asc">{t.sortPriceLow}</option>
          <option value="price-desc">{t.sortPriceHigh}</option>
        </Select>
      </Toolbar>

      {errors.fetchAll && (
        <ErrorBanner role="alert">
          {errors.fetchAll}
          <button type="button" onClick={() => dispatch(fetchProducts())}>
            {t.retry}
          </button>
        </ErrorBanner>
      )}

      <TableCard>
        {loading.fetchAll && products.length === 0 ? (
          <StateMessage>{t.loadingProducts}</StateMessage>
        ) : visibleProducts.length === 0 ? (
          <StateMessage>{t.noProducts}</StateMessage>
        ) : (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>{t.productName}</th>
                  <th>{t.category}</th>
                  <th>{t.price}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <ProductCell>
                        <Image src={product.image} alt={product.title} />
                        <ProductTitle>{product.title}</ProductTitle>
                      </ProductCell>
                    </td>

                    <td>
                      <CategoryTag>{product.category}</CategoryTag>
                    </td>

                    <td>
                      <Price>${product.price.toFixed(2)}</Price>
                    </td>

                    <td>
                      <SecondaryButton
                        type="button"
                        onClick={() => handleDetails(product)}
                      >
                        {t.details}
                      </SecondaryButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </TableCard>

      <Pagination>
        <span>
          {t.page} {currentPage} {t.of} {totalPages}
        </span>

        <div>
          <PageButton
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            {t.previous}
          </PageButton>

          <PageButton
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            {t.next}
          </PageButton>
        </div>
      </Pagination>

      {isFormOpen && (
        <Overlay onClick={() => setIsFormOpen(false)}>
          <Modal onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <h2>{t.addNewProduct}</h2>

              <CloseButton
                type="button"
                onClick={() => setIsFormOpen(false)}
                aria-label={t.close}
              >
                ×
              </CloseButton>
            </ModalHeader>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleCreateProduct}
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

                      {availableCategories.map((item) => (
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

                  {errors.create && (
                    <ErrorBanner role="alert">{errors.create}</ErrorBanner>
                  )}

                  <FormActions>
                    <SecondaryButton
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                    >
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
      )}

      {detailsOpen && (
        <Overlay onClick={closeDetails}>
          <Modal onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <h2>{t.details}</h2>

              <CloseButton
                type="button"
                onClick={closeDetails}
                aria-label={t.close}
              >
                ×
              </CloseButton>
            </ModalHeader>

            {loading.fetchById ? (
              <StateMessage>{t.loadingProducts}</StateMessage>
            ) : (
              <DetailsContent>
                {(() => {
                  const item = selectedProduct;

                  if (!item) {
                    return <StateMessage>{t.noProducts}</StateMessage>;
                  }

                  return (
                    <>
                      <DetailImage src={item.image} alt={item.title} />
                      <h3>{item.title}</h3>
                      <CategoryTag>{item.category}</CategoryTag>
                      <Price>${item.price.toFixed(2)}</Price>
                      <p>{item.description}</p>

                      <small>
                        {t.rating}: {item.rating?.rate ?? "—"} / 5{" · "}
                        {t.reviews}: {item.rating?.count ?? "—"}
                      </small>
                    </>
                  );
                })()}
              </DetailsContent>
            )}

            {errors.fetchById && (
              <ErrorBanner role="alert">{errors.fetchById}</ErrorBanner>
            )}
          </Modal>
        </Overlay>
      )}
    </Page>
  );
}

export default ProductsPage;

// Styled Components
const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  min-width: 0;

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 26px;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  min-height: 42px;
  padding: 11px 18px;
  border: 0;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-family: inherit;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    align-self: stretch;
  }
`;

const SecondaryButton = styled.button`
  padding: 8px 13px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) repeat(2, minmax(160px, 200px));
  gap: 12px;
  width: 100%;
  min-width: 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font-family: inherit;
  font-size: 13px;
  text-align: start;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Select = styled.select`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  padding: 10px 14px;
  padding-inline-end: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font-family: inherit;
  font-size: 13px;
  text-align: start;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  option {
    padding: 10px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TableCard = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: start;

  th,
  td {
    padding: 15px 18px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: start;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
  }

  th {
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.background};
    font-weight: 600;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
`;

const Image = styled.img`
  width: 42px;
  height: 42px;
  padding: 4px;
  object-fit: contain;
  background: #fff;
  border-radius: 7px;
`;

const ProductTitle = styled.span`
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CategoryTag = styled.span`
  display: inline-block;
  padding: 6px 9px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  font-size: 12px;
`;

const Price = styled.strong`
  color: ${({ theme }) => theme.colors.accent};
  white-space: nowrap;
`;

const StateMessage = styled.p`
  padding: 32px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 480px) {
    align-items: stretch;
    flex-direction: column;

    > div {
      width: 100%;
    }
  }
`;

const PageButton = styled.button`
  margin-inline-start: 8px;
  padding: 8px 13px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 7px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(0 0 0 / 55%);
`;

const Modal = styled.div`
  width: min(560px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;

  h2 {
    margin: 0;
    font-size: 19px;
  }
`;

const CloseButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 26px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const FormLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const FieldError = styled(ErrorMessage)`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 420px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const DetailImage = styled.img`
  width: 150px;
  height: 150px;
  align-self: center;
  object-fit: contain;
  padding: 12px;
  background: #fff;
  border-radius: 10px;
`;

const SuccessBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.success};

  button {
    border: 0;
    background: transparent;
    color: inherit;
    font-size: 20px;
  }
`;

const ErrorBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.danger};

  button {
    padding: 7px 12px;
    border: 0;
    border-radius: 6px;
    color: #fff;
    background: ${({ theme }) => theme.colors.danger};
  }
`;
