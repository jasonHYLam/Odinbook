import { Link } from "react-router-dom";

export function Login() {
  return (
    <main>
      <p>Login</p>
      <Link to="/sign_up">New here? Sign up</Link>
    </main>
  );
}
