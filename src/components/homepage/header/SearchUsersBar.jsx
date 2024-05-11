import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";

export function SearchUsersBar({
  searchQuery,
  setSearchQuery,
  setMatchingUsers,
}) {
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
        console.log("checking location");
        console.log(location);
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
