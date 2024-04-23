import { Link } from "react-router-dom";
import { Logo } from "../icons/logo/Logo";
import { ProfilePic } from "../icons/profilePic/ProfilePic";

export function Header({ user }) {
  return (
    <header>
      <Link to="/">
        <Logo size="small" />
      </Link>
      <section>
        <Link to="create_post">New Post</Link>
        <Link to="search_users">Search Users</Link>
      </section>
      <Link to="me">
        <ProfilePic URL={user.profilePicURL} size="small" />
      </Link>
    </header>
  );
}
