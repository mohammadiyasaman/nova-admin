import styled from "styled-components";
import { Form, Field, ErrorMessage } from "formik";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
`;

export const PageHeader = styled.div`
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

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 26px;
`;

export const Subtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const PrimaryButton = styled.button`
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

export const SecondaryButton = styled.button`
  padding: 8px 13px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Toolbar = styled.div`
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

export const SearchInput = styled.input`
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

export const Select = styled.select`
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

export const TableCard = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
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

export const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
`;

export const Image = styled.img`
  width: 42px;
  height: 42px;
  padding: 4px;
  object-fit: contain;
  background: #fff;
  border-radius: 7px;
`;

export const ProductTitle = styled.span`
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CategoryTag = styled.span`
  display: inline-block;
  padding: 6px 9px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  font-size: 12px;
`;

export const Price = styled.strong`
  color: ${({ theme }) => theme.colors.accent};
  white-space: nowrap;
`;

export const StateMessage = styled.p`
  padding: 32px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

export const Pagination = styled.div`
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

export const PageButton = styled.button`
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

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(0 0 0 / 55%);
`;

export const Modal = styled.div`
  width: min(560px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalHeader = styled.div`
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

export const CloseButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 26px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const FormLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
`;

export const StyledField = styled(Field)`
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

export const FieldError = styled(ErrorMessage)`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
`;

export const FormActions = styled.div`
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

export const DetailsContent = styled.div`
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

export const DetailImage = styled.img`
  width: 150px;
  height: 150px;
  align-self: center;
  object-fit: contain;
  padding: 12px;
  background: #fff;
  border-radius: 10px;
`;

export const SuccessBanner = styled.div`
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

export const ErrorBanner = styled.div`
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
