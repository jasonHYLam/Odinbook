import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <Link to="create_post">New Post</Link>
      <Link to="personal_profile">Profile</Link>
    </header>
  );
}
