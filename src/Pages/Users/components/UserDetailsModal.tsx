import {
  Overlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  IconButton,
  LoadingContent,
  Spinner,
  DetailsAlert as Alert,
  EmptyMessage,
  DetailsGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  ModalActions,
  SecondaryButton,
} from "../UsersPage.styles";

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
