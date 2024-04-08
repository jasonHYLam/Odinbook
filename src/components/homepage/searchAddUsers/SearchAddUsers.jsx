import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

export function SearchAddUsers() {
  const navigate = useNavigate();
  const { user } = useOutletContext();

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

  function isFollowedByLoggedInUser(user) {
    return user.following.some((follower) => follower.id === user.id);
  }

  async function followUser(userID) {
    const followResponse = await fetchData(`user/${userID}/follow`, "POST");
    if (!followResponse.ok || followResponse instanceof Error) {
      navigate("/error");
    } else {
      return;
    }
  }

  async function unfollowUser(userID) {
    const followResponse = await fetchData(`user/${userID}/unfollow`, "POST");
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
            return (
              <article>
                <p>{user.username}</p>
                {isFollowedByLoggedInUser(user) ? (
                  <button onClick={() => unfollowUser(user.id)}>
                    unfollow
                  </button>
                ) : (
                  <button onClick={() => followUser(user.id)}>follow</button>
                )}
              </article>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
