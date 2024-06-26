import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";
import { UserType } from "../../../helper/types";

interface SearchUsersBarProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setMatchingUsers: (matchingUsers: UserType[]) => void;
}

export function SearchUsersBar({
  searchQuery,
  setSearchQuery,
  setMatchingUsers,
}: SearchUsersBarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function searchUsers() {
      if (!searchQuery) return;
      const dataToSubmit = JSON.stringify({ searchQuery });
      const searchResponse = await fetchData(
        `user/search_users`,
        "POST",
        dataToSubmit
      );

      if (!searchResponse.ok || searchResponse instanceof Error) {
        navigate("/error");
      } else {
        const { users } = await searchResponse.json();
        setMatchingUsers(users);
        navigate("/search_users");
      }
    }
    searchUsers();
  }, [searchQuery, navigate, setMatchingUsers]);

  return (
    <input
      type="text"
      placeholder="Search users"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    ></input>
  );
}
