import { useEffect, useState } from "react";

import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  PagePrimaryButton as PrimaryButton,
  SecondaryButton,
  Toolbar,
  SearchInput,
  UserCount,
  PageAlert as Alert,
  AlertClose,
} from "./UsersPage.styles";

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
          {t.usersLoadError}
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
          error={error.create ? t.createUserError : null}
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
          error={error.fetchById ? t.userDetailsError : null}
          labels={t}
          onClose={closeDetailsModal}
        />
      )}
    </PageContainer>
  );
}

export default UsersPage;
