import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { fetchProducts } from "@/Redux/Slices/productThunks";
import { fetchUsers } from "@/Redux/Slices/userThunks";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";

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
      label: language === "fa" ? "تعداد محصولات" : "Total Products",
      value: products.length,
      symbol: "P",
      color: "#F58220",
    },
    {
      label: language === "fa" ? "تعداد کاربران" : "Total Users",
      value: users.length,
      symbol: "U",
      color: "#3B82F6",
    },
    {
      label: language === "fa" ? "دسته‌بندی‌ها" : "Categories",
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
          <Title>{language === "fa" ? "داشبورد" : "Dashboard"}</Title>
          <Description>
            {language === "fa"
              ? "نمای کلی وضعیت فروشگاه نوا"
              : "An overview of your NOVA store"}
          </Description>
        </div>
      </PageHeader>

      {hasError && (
        <ErrorMessage role="alert">
          {language === "fa"
            ? "دریافت بخشی از اطلاعات با خطا مواجه شد."
            : "Some dashboard data could not be loaded."}
          <button
            type="button"
            onClick={() => {
              dispatch(fetchProducts());
              dispatch(fetchUsers());
            }}
          >
            {language === "fa" ? "تلاش مجدد" : "Retry"}
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
          <SectionTitle>
            {language === "fa" ? "آخرین محصولات" : "Recent Products"}
          </SectionTitle>
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

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(21px, 3vw, 26px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  box-sizing: border-box;
  padding: 22px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;

  @media (max-width: 600px) {
    padding: 18px;
  }
`;

const StatIcon = styled.div<{ $color: string }>`
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 12px;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => `${$color}18`};
  font-weight: 800;
  font-size: 20px;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  overflow-wrap: anywhere;
`;

const StatValue = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  font-size: 26px;
`;

const Section = styled.section`
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
`;

const CountLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 420px) {
    gap: 10px;
  }
`;

const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  padding: 5px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
`;

const ProductInfo = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
`;

const ProductName = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductCategory = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

const ProductPrice = styled.strong`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 14px;
  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

const StateMessage = styled.p`
  padding: 24px 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  color: ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 10px;

  button {
    padding: 8px 14px;
    color: #fff;
    background: ${({ theme }) => theme.colors.danger};
    border: 0;
    border-radius: 7px;
  }
`;
