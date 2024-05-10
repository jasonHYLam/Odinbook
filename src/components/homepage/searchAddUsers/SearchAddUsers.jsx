import styles from "./SearchAddUsers.module.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { ProfilePic } from "../icons/profilePic/ProfilePic";

export function SearchAddUsers() {
  const navigate = useNavigate();
  const { loggedInUser, matchingUsers } = useOutletContext();

  function isFollowedByLoggedInUser(searchedUser) {
    return searchedUser.followers.some(
      (follower) => follower === loggedInUser.id
    );
  }

  return (
    <main>
      <h2>Searching user</h2>
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
