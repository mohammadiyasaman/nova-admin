import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  fetchUsers,
  fetchUserById,
  createUser,
} from "@/Redux/Slices/userThunks";
import { clearSelectedUser, clearUserError } from "@/Redux/Slices/userSlice";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";
import type { CreateUserPayload } from "@/types/user";

/* -------------------------------------------------------------------------- */
/*                                  Validation                                */
/* -------------------------------------------------------------------------- */

const userValidationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر وارد کنید")
    .required("وارد کردن ایمیل الزامی است"),

  username: Yup.string()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .required("وارد کردن نام کاربری الزامی است"),

  password: Yup.string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .required("وارد کردن رمز عبور الزامی است"),

  name: Yup.object({
    firstname: Yup.string().required("نام الزامی است"),
    lastname: Yup.string().required("نام خانوادگی الزامی است"),
  }),

  phone: Yup.string().required("شماره تلفن الزامی است"),

  address: Yup.object({
    city: Yup.string().required("شهر الزامی است"),
    street: Yup.string().required("خیابان الزامی است"),
    number: Yup.number()
      .typeError("شماره پلاک باید عدد باشد")
      .integer("شماره پلاک باید عدد صحیح باشد")
      .min(1, "شماره پلاک باید بزرگ‌تر از صفر باشد")
      .required("شماره پلاک الزامی است"),
    zipcode: Yup.string().required("کد پستی الزامی است"),
  }),
});

const initialValues: CreateUserPayload = {
  email: "",
  username: "",
  password: "",
  name: {
    firstname: "",
    lastname: "",
  },
  address: {
    city: "",
    street: "",
    number: 1,
    zipcode: "",
  },
  phone: "",
};

/* -------------------------------------------------------------------------- */
/*                                   Component                                */
/* -------------------------------------------------------------------------- */

function UsersPage() {
  const dispatch = useAppDispatch();
  const { language } = useAdminUI();

  const isFa = language === "fa";

  const { items, selectedUser, loading, error } = useAppSelector(
    (state) => state.users,
  );

  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const translations = {
    title: isFa ? "مدیریت کاربران" : "User Management",
    subtitle: isFa
      ? "مشاهده، جست‌وجو و مدیریت کاربران"
      : "View, search and manage users",
    addUser: isFa ? "افزودن کاربر" : "Add User",
    search: isFa
      ? "جست‌وجو بر اساس نام، نام کاربری یا ایمیل..."
      : "Search by name, username or email...",
    name: isFa ? "نام و نام خانوادگی" : "Full Name",
    username: isFa ? "نام کاربری" : "Username",
    email: isFa ? "ایمیل" : "Email",
    phone: isFa ? "شماره تلفن" : "Phone",
    actions: isFa ? "عملیات" : "Actions",
    details: isFa ? "جزئیات" : "Details",
    noUsers: isFa ? "کاربری پیدا نشد." : "No users found.",
    noUsersYet: isFa
      ? "هنوز کاربری برای نمایش وجود ندارد."
      : "There are no users to display yet.",
    loading: isFa ? "در حال دریافت اطلاعات کاربران..." : "Loading users...",
    retry: isFa ? "تلاش مجدد" : "Try Again",
    createTitle: isFa ? "افزودن کاربر جدید" : "Add New User",
    detailsTitle: isFa ? "جزئیات کاربر" : "User Details",
    firstName: isFa ? "نام" : "First Name",
    lastName: isFa ? "نام خانوادگی" : "Last Name",
    password: isFa ? "رمز عبور" : "Password",
    city: isFa ? "شهر" : "City",
    street: isFa ? "خیابان" : "Street",
    number: isFa ? "شماره پلاک" : "Building Number",
    zipcode: isFa ? "کد پستی" : "Zip Code",
    cancel: isFa ? "انصراف" : "Cancel",
    save: isFa ? "ثبت کاربر" : "Create User",
    creating: isFa ? "در حال ثبت..." : "Creating...",
    close: isFa ? "بستن" : "Close",
    userCreated: isFa
      ? "کاربر جدید با موفقیت ثبت شد."
      : "User created successfully.",
    address: isFa ? "آدرس" : "Address",
    userId: isFa ? "شناسه کاربر" : "User ID",
    createError: isFa ? "ثبت کاربر با خطا مواجه شد." : "Failed to create user.",
    detailsError: isFa
      ? "دریافت اطلاعات کاربر با خطا مواجه شد."
      : "Failed to load user details.",
  };

  /* ------------------------------- Fetch Users ------------------------------ */

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* -------------------------------- Search ---------------------------------- */

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();

    if (!normalizedSearch) {
      return items;
    }

    return items.filter((user) => {
      const fullName =
        `${user.name.firstname} ${user.name.lastname}`.toLocaleLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        user.username.toLocaleLowerCase().includes(normalizedSearch) ||
        user.email.toLocaleLowerCase().includes(normalizedSearch)
      );
    });
  }, [items, search]);

  /* ------------------------------- Modal Logic ------------------------------ */

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

  /* ------------------------------- Create User ------------------------------ */

  const handleCreateUser = async (
    values: CreateUserPayload,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      await dispatch(createUser(values)).unwrap();

      resetForm();
      setIsCreateModalOpen(false);
      setSuccessMessage(translations.userCreated);
    } catch {
      // خطای ثبت از طریق Redux در error.create نگهداری می‌شود.
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                     UI                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <PageContainer dir={isFa ? "rtl" : "ltr"}>
      <PageHeader>
        <div>
          <PageTitle>{translations.title}</PageTitle>
          <PageSubtitle>{translations.subtitle}</PageSubtitle>
        </div>

        <PrimaryButton type="button" onClick={openCreateModal}>
          <span>+</span>
          {translations.addUser}
        </PrimaryButton>
      </PageHeader>

      {successMessage && (
        <Alert $type="success">
          {successMessage}
          <AlertClose
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Close"
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
          placeholder={translations.search}
        />

        <UserCount>
          {isFa ? "تعداد کاربران:" : "Users:"} {filteredUsers.length}
        </UserCount>
      </Toolbar>

      {error.fetchAll && (
        <Alert $type="danger">
          {error.fetchAll}
          <SecondaryButton type="button" onClick={() => dispatch(fetchUsers())}>
            {translations.retry}
          </SecondaryButton>
        </Alert>
      )}

      <TableContainer>
        <UsersTable>
          <thead>
            <tr>
              <th>{translations.name}</th>
              <th>{translations.username}</th>
              <th>{translations.email}</th>
              <th>{translations.phone}</th>
              <th>{translations.actions}</th>
            </tr>
          </thead>

          <tbody>
            {loading.fetchAll ? (
              <tr>
                <EmptyCell colSpan={5}>
                  <LoadingContent>
                    <Spinner />
                    {translations.loading}
                  </LoadingContent>
                </EmptyCell>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <EmptyCell colSpan={5}>
                  {search ? translations.noUsers : translations.noUsersYet}
                </EmptyCell>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <UserName>
                      {user.name.firstname} {user.name.lastname}
                    </UserName>
                  </td>

                  <td>{user.username}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>
                    <TableAction
                      type="button"
                      onClick={() => openDetailsModal(user.id)}
                    >
                      {translations.details}
                    </TableAction>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </UsersTable>
      </TableContainer>

      {/* ----------------------------- Create Modal ---------------------------- */}

      {isCreateModalOpen && (
        <ModalOverlay>
          <ModalContent dir={isFa ? "rtl" : "ltr"}>
            <ModalHeader>
              <ModalTitle>{translations.createTitle}</ModalTitle>

              <IconButton
                type="button"
                onClick={closeCreateModal}
                aria-label={translations.close}
              >
                ×
              </IconButton>
            </ModalHeader>

            {error.create && (
              <Alert $type="danger">
                {error.create || translations.createError}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={userValidationSchema}
              onSubmit={handleCreateUser}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormGrid>
                    <FormField>
                      <FieldLabel>{translations.firstName}</FieldLabel>
                      <StyledField
                        name="name.firstname"
                        placeholder={translations.firstName}
                      />
                      <ErrorMessage
                        name="name.firstname"
                        component={FieldError}
                      />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.lastName}</FieldLabel>
                      <StyledField
                        name="name.lastname"
                        placeholder={translations.lastName}
                      />
                      <ErrorMessage
                        name="name.lastname"
                        component={FieldError}
                      />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.username}</FieldLabel>
                      <StyledField
                        name="username"
                        placeholder={translations.username}
                      />
                      <ErrorMessage name="username" component={FieldError} />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.email}</FieldLabel>
                      <StyledField
                        name="email"
                        type="email"
                        placeholder={translations.email}
                      />
                      <ErrorMessage name="email" component={FieldError} />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.password}</FieldLabel>
                      <StyledField
                        name="password"
                        type="password"
                        placeholder={translations.password}
                      />
                      <ErrorMessage name="password" component={FieldError} />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.phone}</FieldLabel>
                      <StyledField
                        name="phone"
                        placeholder={translations.phone}
                      />
                      <ErrorMessage name="phone" component={FieldError} />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.city}</FieldLabel>
                      <StyledField
                        name="address.city"
                        placeholder={translations.city}
                      />
                      <ErrorMessage
                        name="address.city"
                        component={FieldError}
                      />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.street}</FieldLabel>
                      <StyledField
                        name="address.street"
                        placeholder={translations.street}
                      />
                      <ErrorMessage
                        name="address.street"
                        component={FieldError}
                      />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.number}</FieldLabel>
                      <StyledField
                        name="address.number"
                        type="number"
                        min="1"
                        placeholder={translations.number}
                      />
                      <ErrorMessage
                        name="address.number"
                        component={FieldError}
                      />
                    </FormField>

                    <FormField>
                      <FieldLabel>{translations.zipcode}</FieldLabel>
                      <StyledField
                        name="address.zipcode"
                        placeholder={translations.zipcode}
                      />
                      <ErrorMessage
                        name="address.zipcode"
                        component={FieldError}
                      />
                    </FormField>
                  </FormGrid>

                  <ModalActions>
                    <SecondaryButton type="button" onClick={closeCreateModal}>
                      {translations.cancel}
                    </SecondaryButton>

                    <PrimaryButton
                      type="submit"
                      disabled={loading.create || isSubmitting}
                    >
                      {loading.create || isSubmitting
                        ? translations.creating
                        : translations.save}
                    </PrimaryButton>
                  </ModalActions>
                </Form>
              )}
            </Formik>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* ----------------------------- Details Modal --------------------------- */}

      {isDetailsModalOpen && (
        <ModalOverlay>
          <ModalContent dir={isFa ? "rtl" : "ltr"}>
            <ModalHeader>
              <ModalTitle>{translations.detailsTitle}</ModalTitle>

              <IconButton
                type="button"
                onClick={closeDetailsModal}
                aria-label={translations.close}
              >
                ×
              </IconButton>
            </ModalHeader>

            {loading.fetchById ? (
              <LoadingContent>
                <Spinner />
                {isFa ? "در حال دریافت اطلاعات..." : "Loading details..."}
              </LoadingContent>
            ) : error.fetchById ? (
              <Alert $type="danger">
                {error.fetchById || translations.detailsError}
              </Alert>
            ) : selectedUser ? (
              <DetailsGrid>
                <DetailItem>
                  <DetailLabel>{translations.userId}</DetailLabel>
                  <DetailValue>{selectedUser.id}</DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>{translations.name}</DetailLabel>
                  <DetailValue>
                    {selectedUser.name.firstname} {selectedUser.name.lastname}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>{translations.username}</DetailLabel>
                  <DetailValue>{selectedUser.username}</DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>{translations.email}</DetailLabel>
                  <DetailValue>{selectedUser.email}</DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel>{translations.phone}</DetailLabel>
                  <DetailValue>{selectedUser.phone}</DetailValue>
                </DetailItem>

                <DetailItem $fullWidth>
                  <DetailLabel>{translations.address}</DetailLabel>
                  <DetailValue>
                    {selectedUser.address.city}, {selectedUser.address.street},{" "}
                    {selectedUser.address.number}
                    {" - "}
                    {selectedUser.address.zipcode}
                  </DetailValue>
                </DetailItem>
              </DetailsGrid>
            ) : (
              <EmptyMessage>{translations.noUsers}</EmptyMessage>
            )}

            <ModalActions>
              <SecondaryButton type="button" onClick={closeDetailsModal}>
                {translations.close}
              </SecondaryButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default UsersPage;

/* -------------------------------------------------------------------------- */
/*                                    Styles                                  */
/* -------------------------------------------------------------------------- */

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

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
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

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

const UsersTable = styled.table`
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

const UserName = styled.span`
  font-weight: 600;
`;

const TableAction = styled.button`
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

const EmptyCell = styled.td`
  height: 120px;
  color: ${({ theme }) => theme.colors.textSecondary} !important;
  text-align: center !important;
`;

const EmptyMessage = styled.p`
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
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

const ModalOverlay = styled.div`
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
`;

const StyledField = styled(Field)`
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

const FieldError = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 11px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
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
