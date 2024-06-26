import { Link } from "react-router-dom";
import { Logo } from "../icons/logo/Logo";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import styles from "./Header.module.css";
import { SearchUsersBar } from "./SearchUsersBar";
import { UserType } from "../../../helper/types";

interface HeaderProps {
  user: UserType;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setMatchingUsers: (matchingUsers: UserType[]) => void;
}

export function Header({
  user,
  searchQuery,
  setSearchQuery,
  setMatchingUsers,
}: HeaderProps) {
  return (
    <header>
      <Link to="/">
        <Logo size="small" />
      </Link>
      <section className={styles.center}>
        <Link to="create_post">New Post</Link>
        <SearchUsersBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setMatchingUsers={setMatchingUsers}
        />
      </section>
      <Link to="me">
        <ProfilePic URL={user.profilePicURL} size="small" />
      </Link>
    </header>
  );
}
