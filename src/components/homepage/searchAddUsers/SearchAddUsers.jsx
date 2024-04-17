import styles from "./SearchAddUsers.module.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { ProfilePic } from "../icons/profilePic/ProfilePic";

export function SearchAddUsers() {
  const navigate = useNavigate();
  const { loggedInUser } = useOutletContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);

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
      }
    }
    searchUsers();
  }, [searchQuery]);

  function isFollowedByLoggedInUser(searchedUser) {
    return searchedUser.followers.some(
      (follower) => follower === loggedInUser.id
    );
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
      <h2>Searching user</h2>
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
                <Link to={`/users/${user.id}`} className={styles.row}>
                  <ProfilePic URL={user.profilePicURL} size="small" />
                  <p>{user.username}</p>
                  {isFollowedByLoggedInUser(user) ? (
                    <span className={styles.following}>following</span>
                  ) : null}
                </Link>
              </article>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
