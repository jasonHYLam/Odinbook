import { Link } from "react-router-dom";

export function Header({ user }) {
  return (
    <header>
      <Link to="create_post">New Post</Link>
      <Link to="me">Profile</Link>
      <Link to="search_users">Search Users</Link>
    </header>
  );
}
