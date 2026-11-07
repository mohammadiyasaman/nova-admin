import styled from "styled-components";

type SelectedUser = {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
};

type UserDetailsModalProps = {
  isFa: boolean;
  user: SelectedUser | null;
  isLoading: boolean;
  error?: string | null;
  labels: {
    userDetails: string;
    close: string;
    loadingUserDetails: string;
    userDetailsError: string;
    userId: string;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    noUsers: string;
  };
  onClose: () => void;
};

export function UserDetailsModal({
  isFa,
  user,
  isLoading,
  error,
  labels,
  onClose,
}: UserDetailsModalProps) {
  return (
    <Overlay>
      <ModalContent dir={isFa ? "rtl" : "ltr"}>
        <ModalHeader>
          <ModalTitle>{labels.userDetails}</ModalTitle>
          <IconButton type="button" onClick={onClose} aria-label={labels.close}>
            ×
          </IconButton>
        </ModalHeader>

        {isLoading ? (
          <LoadingContent>
            <Spinner />
            {labels.loadingUserDetails}
          </LoadingContent>
        ) : error ? (
          <Alert>{error || labels.userDetailsError}</Alert>
        ) : user ? (
          <DetailsGrid>
            <DetailItem>
              <DetailLabel>{labels.userId}</DetailLabel>
              <DetailValue>{user.id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{labels.fullName}</DetailLabel>
              <DetailValue>
                {user.name.firstname} {user.name.lastname}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{labels.username}</DetailLabel>
              <DetailValue>{user.username}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{labels.email}</DetailLabel>
              <DetailValue>{user.email}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{labels.phone}</DetailLabel>
              <DetailValue>{user.phone}</DetailValue>
            </DetailItem>
            <DetailItem $fullWidth>
              <DetailLabel>{labels.address}</DetailLabel>
              <DetailValue>
                {user.address.city}, {user.address.street},{" "}
                {user.address.number}
                {" - "}
                {user.address.zipcode}
              </DetailValue>
            </DetailItem>
          </DetailsGrid>
        ) : (
          <EmptyMessage>{labels.noUsers}</EmptyMessage>
        )}

        <ModalActions>
          <SecondaryButton type="button" onClick={onClose}>
            {labels.close}
          </SecondaryButton>
        </ModalActions>
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

const LoadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 100px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

const Spinner = styled.div`
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

const Alert = styled.div`
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;

const EmptyMessage = styled.p`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div<{ $fullWidth?: boolean }>`
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

const DetailLabel = styled.div`
  margin-bottom: 7px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

const DetailValue = styled.div`
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
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
