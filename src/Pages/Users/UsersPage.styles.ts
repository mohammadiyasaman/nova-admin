import styled from "styled-components";
import { Field } from "formik";

// Shared modal styles
export const Overlay = styled.div`
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

export const ModalContent = styled.div`
  width: min(100%, 680px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 20px 60px rgb(0 0 0 / 20%);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 700;
`;

export const IconButton = styled.button`
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

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

export const SecondaryButton = styled.button`
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

// Shared loading styles
export const LoadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 100px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// UserDetailsModal styles
export const DetailsAlert = styled.div`
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;

export const EmptyMessage = styled.p`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div<{ $fullWidth?: boolean }>`
  min-width: 0;
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.background};

  ${({ $fullWidth }) =>
    $fullWidth &&
    `
      grid-column: 1 / -1;
    `}
`;

export const DetailLabel = styled.div`
  margin-bottom: 7px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

export const DetailValue = styled.div`
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
`;

// UserFormModal styles
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

export const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
`;

export const StyledField = styled(Field)`
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

export const FieldError = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 11px;
`;

export const FormPrimaryButton = styled.button`
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

export const FormAlert = styled.div`
  margin-bottom: 16px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;

// UsersTable styles
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  text-align: start;

  th,
  td {
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
    text-align: start;
  }

  th {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
    white-space: nowrap;
  }

  td {
    color: ${({ theme }) => theme.colors.text};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const UserName = styled.span`
  font-weight: 600;
`;

export const TableAction = styled.button`
  padding: 7px 12px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 7px;
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }
`;

export const EmptyCell = styled.td`
  height: 120px;
  color: ${({ theme }) => theme.colors.textSecondary} !important;
  text-align: center !important;
`;

// UsersPage styles
export const PageContainer = styled.div`
  width: 100%;
  min-width: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const PageSubtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const PagePrimaryButton = styled.button`
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
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.88;
  }

  span {
    font-size: 20px;
    line-height: 1;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  min-width: 0;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 420px;
  min-width: 0;
  min-height: 42px;
  box-sizing: border-box;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 13px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 600px) {
    max-width: none;
  }
`;

export const UserCount = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  white-space: nowrap;

  @media (max-width: 600px) {
    align-self: flex-start;
  }
`;

export const PageAlert = styled.div<{ $type: "success" | "danger" }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px 14px;
  padding-inline-end: 42px;
  border: 1px solid
    ${({ theme, $type }) =>
      $type === "success" ? theme.colors.success : theme.colors.danger};
  border-radius: 9px;
  color: ${({ theme, $type }) =>
    $type === "success" ? theme.colors.success : theme.colors.danger};
  font-size: 13px;
`;

export const AlertClose = styled.button`
  position: absolute;
  inset-inline-end: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
`;
