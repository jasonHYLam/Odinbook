import styles from "./SearchAddUsers.module.css";
import { useOutletContext, Link } from "react-router-dom";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import { UserType } from "../../../helper/types";

interface OutletContextForSearchAddUsers {
  loggedInUser: UserType;
  matchingUsers: UserType[];
  resetSearchQuery: (searchQuery: string) => void;
}

export function SearchAddUsers() {
  const { loggedInUser, matchingUsers, resetSearchQuery } =
    useOutletContext<OutletContextForSearchAddUsers>();

  function isFollowedByLoggedInUser(searchedUser: UserType) {
    return searchedUser.followers.some(
      (followerID) => followerID === loggedInUser.id
    );
  }

  return (
    <main>
      <h2>Searching user</h2>
      <section>
        <ul>
          {matchingUsers.map((user) => {
            return (
              <article key={user.id}>
                <Link
                  to={`/users/${user.id}`}
                  className={styles.row}
                  onClick={resetSearchQuery}
                >
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
