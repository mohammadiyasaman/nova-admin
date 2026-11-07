import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { fetchProducts } from "@/Redux/Slices/productThunks";
import { fetchUsers } from "@/Redux/Slices/userThunks";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";
import {
  Page,
  PageHeader,
  Title,
  Description,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatLabel,
  StatValue,
  Section,
  SectionHeader,
  SectionTitle,
  CountLabel,
  ProductList,
  ProductRow,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductCategory,
  ProductPrice,
  StateMessage,
  ErrorMessage,
} from "./DashboardPage.styles";

function DashboardPage() {
  const dispatch = useAppDispatch();
  const { t, language } = useAdminUI();

  const products = useAppSelector((state) => state.products.items);
  const productLoading = useAppSelector(
    (state) => state.products.loading.fetchAll,
  );
  const productError = useAppSelector((state) => state.products.error.fetchAll);

  const users = useAppSelector((state) => state.users.items);
  const userLoading = useAppSelector((state) => state.users.loading.fetchAll);
  const userError = useAppSelector((state) => state.users.error.fetchAll);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
    if (users.length === 0) dispatch(fetchUsers());
  }, [dispatch, products.length, users.length]);

  const categoryCount = useMemo(
    () => new Set(products.map((product) => product.category)).size,
    [products],
  );

  const stats = [
    {
      label: t.totalProducts,
      value: products.length,
      symbol: "P",
      color: "#F58220",
    },
    {
      label: t.totalUsers,
      value: users.length,
      symbol: "U",
      color: "#3B82F6",
    },
    {
      label: t.categories,
      value: categoryCount,
      symbol: "C",
      color: "#16A085",
    },
  ];

  const isLoading = productLoading || userLoading;
  const hasError = productError || userError;

  return (
    <Page>
      <PageHeader>
        <div>
          <Title>{t.dashboard}</Title>
          <Description>{t.dashboardSubtitle}</Description>
        </div>
      </PageHeader>

      {hasError && (
        <ErrorMessage role="alert">
          {t.dashboardLoadError}
          <button
            type="button"
            onClick={() => {
              dispatch(fetchProducts());
              dispatch(fetchUsers());
            }}
          >
            {t.retry}
          </button>
        </ErrorMessage>
      )}

      <StatsGrid>
        {stats.map((stat) => (
          <StatCard key={stat.label}>
            <StatIcon $color={stat.color}>{stat.symbol}</StatIcon>
            <StatInfo>
              <StatLabel>{stat.label}</StatLabel>
              <StatValue>
                {isLoading
                  ? "—"
                  : stat.value.toLocaleString(
                      language === "fa" ? "fa-IR" : "en-US",
                    )}
              </StatValue>
            </StatInfo>
          </StatCard>
        ))}
      </StatsGrid>

      <Section>
        <SectionHeader>
          <SectionTitle>{t.recentProducts}</SectionTitle>
          <CountLabel>{products.length}</CountLabel>
        </SectionHeader>

        {productLoading && products.length === 0 ? (
          <StateMessage>{t.loading}</StateMessage>
        ) : products.length === 0 ? (
          <StateMessage>{t.noData}</StateMessage>
        ) : (
          <ProductList>
            {products.slice(0, 5).map((product) => (
              <ProductRow key={product.id}>
                <ProductImage src={product.image} alt={product.title} />
                <ProductInfo>
                  <ProductName>{product.title}</ProductName>
                  <ProductCategory>{product.category}</ProductCategory>
                </ProductInfo>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              </ProductRow>
            ))}
          </ProductList>
        )}
      </Section>
    </Page>
  );
}

export default DashboardPage;
