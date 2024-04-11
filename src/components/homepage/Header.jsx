import { Link } from "react-router-dom";
import { Logo } from "./icons/logo/Logo";

export function Header({ user }) {
  return (
    <header>
      <Link to="/">
        <Logo />
      </Link>
      <Link to="create_post">New Post</Link>
      <Link to="me">Profile</Link>
      <Link to="search_users">Search Users</Link>
    </header>
  );
}
