import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(21px, 3vw, 26px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const StatsGrid = styled.div`
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

export const StatCard = styled.div`
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

export const StatIcon = styled.div<{ $color: string }>`
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

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  overflow-wrap: anywhere;
`;

export const StatValue = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  font-size: 26px;
`;

export const Section = styled.section`
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
`;

export const CountLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductRow = styled.div`
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

export const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  padding: 5px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
`;

export const ProductName = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductCategory = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

export const ProductPrice = styled.strong`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 14px;
  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

export const StateMessage = styled.p`
  padding: 24px 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

export const ErrorMessage = styled.div`
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
