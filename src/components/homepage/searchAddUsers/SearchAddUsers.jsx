import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";

export function SearchAddUsers() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);

  useEffect(() => {
    async function searchUsers() {
      if (!searchQuery) return;
      const dataToSubmit = JSON.stringify({ searchQuery });
      console.log("dataToSubmit");
      console.log(dataToSubmit);
      const searchResponse = await fetchData(
        `user/search_users`,
        "POST",
        dataToSubmit
      );
      if (!searchResponse.ok || searchResponse instanceof Error) {
        navigate("/error");
      } else {
        const { users } = await searchResponse.json();
        console.log(users);
        setMatchingUsers(users);
      }
    }
    searchUsers();
  }, [searchQuery]);

  async function followUser(userID) {
    const followResponse = await fetchData(`user/${userID}/follow`, "POST");
    if (!followResponse.ok || followResponse instanceof Error) {
      navigate("/error");
    } else {
      return;
    }
  }

  return (
    <main>
      <p>it's me searchaddusers</p>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <section>
        <ul>
          {matchingUsers.map((user) => {
            return <article>{user.username}</article>;
          })}
        </ul>
      </section>
    </main>
  );
}
