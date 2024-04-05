import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../helper/helperUtils";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function submitLoginData(data) {
    const dataToSubmit = JSON.stringify(data);
    const response = await fetchData("auth/login", "POST", dataToSubmit);
    if (!response.ok || response instanceof Error) {
      navigate("/error");
    }
    console.log("will this happen instantly");
    navigate("/feed");
  }
  return (
    <main>
      <p>Login</p>
      <form onSubmit={handleSubmit(submitLoginData)}>
        <input type="text" {...register("username", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <input type="submit" value="Login" />
      </form>
      <Link to="/sign_up">New here? Sign up</Link>
    </main>
  );
}
