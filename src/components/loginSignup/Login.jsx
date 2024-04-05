import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <main>
      <p>Login</p>
      <form onSubmit={handleSubmit()}>
        <input type="text" {...register("username", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <input type="submit" value="Login" />
      </form>
      <Link to="/sign_up">New here? Sign up</Link>
    </main>
  );
}
