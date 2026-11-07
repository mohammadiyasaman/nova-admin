import styled from "styled-components";

type UserListItem = {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  username: string;
  email: string;
  phone: string;
};

type UsersTableProps = {
  users: UserListItem[];
  loading: boolean;
  search: string;
  onShowDetails: (userId: number) => void;
  labels: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    actions: string;
    loadingUsers: string;
    noUsers: string;
    noUsersYet: string;
    details: string;
  };
};

export function UsersTable({
  users,
  loading,
  search,
  onShowDetails,
  labels,
}: UsersTableProps) {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>{labels.fullName}</th>
            <th>{labels.username}</th>
            <th>{labels.email}</th>
            <th>{labels.phone}</th>
            <th>{labels.actions}</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <EmptyCell colSpan={5}>
                <LoadingContent>
                  <Spinner />
                  {labels.loadingUsers}
                </LoadingContent>
              </EmptyCell>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <EmptyCell colSpan={5}>
                {search ? labels.noUsers : labels.noUsersYet}
              </EmptyCell>
            </tr>
          ) : (
            users.map((user) => (
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
                    onClick={() => onShowDetails(user.id)}
                  >
                    {labels.details}
                  </TableAction>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

const StyledTable = styled.table`
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
