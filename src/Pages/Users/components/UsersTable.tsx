import {
  TableContainer,
  StyledTable,
  UserName,
  TableAction,
  EmptyCell,
  LoadingContent,
  Spinner,
} from "../UsersPage.styles";

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
