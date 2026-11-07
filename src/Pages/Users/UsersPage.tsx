import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  fetchUsers,
  fetchUserById,
  createUser,
} from "@/Redux/Slices/userThunks";
import { clearSelectedUser, clearUserError } from "@/Redux/Slices/userSlice";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";
import type { CreateUserPayload } from "@/types/user";

import { useUserSearch } from "./hooks/useUserSearch";
import { UsersTable } from "./components/UsersTable";
import { UserFormModal } from "./components/UserFormModal";
import { UserDetailsModal } from "./components/UserDetailsModal";

function UsersPage() {
  const dispatch = useAppDispatch();
  const { language, t } = useAdminUI();
  const isFa = language === "fa";

  const { items, selectedUser, loading, error } = useAppSelector(
    (state) => state.users,
  );

  const { search, setSearch, filteredUsers } = useUserSearch(items);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openCreateModal = () => {
    setSuccessMessage("");
    dispatch(clearUserError());
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    dispatch(clearUserError());
  };

  const openDetailsModal = (userId: number) => {
    dispatch(clearSelectedUser());
    dispatch(clearUserError());
    setIsDetailsModalOpen(true);
    dispatch(fetchUserById(userId));
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    dispatch(clearSelectedUser());
    dispatch(clearUserError());
  };

  const handleCreateUser = async (
    values: CreateUserPayload,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      await dispatch(createUser(values)).unwrap();
      resetForm();
      setIsCreateModalOpen(false);
      setSuccessMessage(t.userCreated);
    } catch {
      // The create error is stored in Redux.
    }
  };

  return (
    <PageContainer dir={isFa ? "rtl" : "ltr"}>
      <PageHeader>
        <div>
          <PageTitle>{t.usersTitle}</PageTitle>
          <PageSubtitle>{t.usersSubtitle}</PageSubtitle>
        </div>

        <PrimaryButton type="button" onClick={openCreateModal}>
          <span>+</span>
          {t.addUser}
        </PrimaryButton>
      </PageHeader>

      {successMessage && (
        <Alert $type="success">
          {successMessage}
          <AlertClose
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label={t.close}
          >
            ×
          </AlertClose>
        </Alert>
      )}

      <Toolbar>
        <SearchInput
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t.usersSearch}
        />
        <UserCount>
          {t.usersCount} {filteredUsers.length}
        </UserCount>
      </Toolbar>

      {error.fetchAll && (
        <Alert $type="danger">
          {error.fetchAll}
          <SecondaryButton type="button" onClick={() => dispatch(fetchUsers())}>
            {t.retry}
          </SecondaryButton>
        </Alert>
      )}

      <UsersTable
        users={filteredUsers}
        loading={loading.fetchAll}
        search={search}
        onShowDetails={openDetailsModal}
        labels={t}
      />

      {isCreateModalOpen && (
        <UserFormModal
          isFa={isFa}
          error={error.create}
          isCreating={loading.create}
          labels={t}
          onClose={closeCreateModal}
          onSubmit={handleCreateUser}
        />
      )}

      {isDetailsModalOpen && (
        <UserDetailsModal
          isFa={isFa}
          user={selectedUser}
          isLoading={loading.fetchById}
          error={error.fetchById}
          labels={t}
          onClose={closeDetailsModal}
        />
      )}
    </PageContainer>
  );
}

export default UsersPage;

const PageContainer = styled.div`
  width: 100%;
  min-width: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const PageHeader = styled.div`
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

const PageTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const PageSubtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

const PrimaryButton = styled.button`
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

const Toolbar = styled.div`
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

const SearchInput = styled.input`
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

const UserCount = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  white-space: nowrap;

  @media (max-width: 600px) {
    align-self: flex-start;
  }
`;

const Alert = styled.div<{ $type: "success" | "danger" }>`
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

const AlertClose = styled.button`
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
