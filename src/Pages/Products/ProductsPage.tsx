import { useEffect, useMemo, useState } from "react";
import type { FormikHelpers } from "formik";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
} from "@/Redux/Slices/productThunks";
import { productService } from "@/Utils/services/productService";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";
import type { CreateProductPayload, Product } from "@/types/product";
import { getProductValidationSchema } from "@/Validations/productValidation";

import { useProductFilters } from "./hooks/useProductFilters";

import ProductsToolbar from "./components/ProductsToolbar";
import ProductsTable from "./components/ProductsTable";
import ProductPagination from "./components/ProductPagination";
import ProductFormModal from "./components/ProductFormModal";
import ProductDetailsModal from "./components/ProductDetailsModal";

import {
  ErrorBanner,
  Page,
  PageHeader,
  PrimaryButton,
  Subtitle,
  SuccessBanner,
  Title,
} from "./ProductsPage.styles";

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

  // Redux state
  const products = useAppSelector((state) => state.products.items);

  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct,
  );

  const loading = useAppSelector((state) => state.products.loading);

  const errors = useAppSelector((state) => state.products.error);

  // Local state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validation
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
        // Categories are derived from products if the request fails.
      });

    return () => {
      isActive = false;
    };
  }, []);

  // Available categories
  const availableCategories = useMemo(
    () =>
      categories.length > 0
        ? categories
        : [...new Set(products.map((item) => item.category))],
    [categories, products],
  );

  // Filtering, sorting and pagination
  const { visibleProducts, totalPages } = useProductFilters({
    products,
    search,
    category,
    sort,
    currentPage,
  });

  // Create product
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

  // Product details
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

      {/* Success message */}
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

      {/* Search, category and sorting */}
      <ProductsToolbar
        search={search}
        category={category}
        sort={sort}
        categories={availableCategories}
        t={t}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onCategoryChange={(value) => {
          setCategory(value);
          setCurrentPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);
          setCurrentPage(1);
        }}
      />

      {/* Fetch products error */}
      {errors.fetchAll && (
        <ErrorBanner role="alert">
          {errors.fetchAll}

          <button type="button" onClick={() => dispatch(fetchProducts())}>
            {t.retry}
          </button>
        </ErrorBanner>
      )}

      {/* Products table */}
      <ProductsTable
        products={visibleProducts}
        loading={loading.fetchAll}
        t={t}
        onDetails={handleDetails}
      />

      {/* Pagination */}
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        t={t}
        onPageChange={setCurrentPage}
      />

      {/* Create product modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        initialValues={initialValues}
        validationSchema={validationSchema}
        categories={availableCategories}
        createError={errors.create}
        t={t}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateProduct}
      />

      {/* Product details modal */}
      <ProductDetailsModal
        isOpen={detailsOpen}
        product={selectedProduct}
        loading={loading.fetchById}
        error={errors.fetchById}
        t={t}
        onClose={closeDetails}
      />
    </Page>
  );
}

export default ProductsPage;
