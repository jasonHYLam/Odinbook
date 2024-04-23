import { Link } from "react-router-dom";
import { Logo } from "../icons/logo/Logo";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import styles from "./Header.module.css";
import { SearchUsersBar } from "./SearchUsersBar";

export function Header({ user }) {
  return (
    <header>
      <Link to="/">
        <Logo size="small" />
      </Link>
      <section className={styles.center}>
        <Link to="create_post">New Post</Link>
        <SearchUsersBar />

        {/* <Link to="search_users">Search Users</Link> */}
      </section>
      <Link to="me">
        <ProfilePic URL={user.profilePicURL} size="small" />
      </Link>
    </header>
  );
}
