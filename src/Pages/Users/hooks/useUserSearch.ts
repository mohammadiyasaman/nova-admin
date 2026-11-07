import { useMemo, useState } from "react";

type SearchableUser = {
  name: {
    firstname: string;
    lastname: string;
  };
  username: string;
  email: string;
};

export function useUserSearch<T extends SearchableUser>(users: T[]) {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      const fullName =
        `${user.name.firstname} ${user.name.lastname}`.toLocaleLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        user.username.toLocaleLowerCase().includes(normalizedSearch) ||
        user.email.toLocaleLowerCase().includes(normalizedSearch)
      );
    });
  }, [users, search]);

  return {
    search,
    setSearch,
    filteredUsers,
  };
}
