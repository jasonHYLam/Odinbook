import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../helper/helperUtils";
import { useState } from "react";
import { GuestLoginLink } from "./GuestLoginLink";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [authError, setAuthError] = useState(null);

  async function submitLoginData(data) {
    const dataToSubmit = JSON.stringify(data);
    const response = await fetchData("auth/login", "POST", dataToSubmit);
    if (response.status === 401) {
      setAuthError("Incorrect username/password");
    } else if (!response.ok || response instanceof Error) {
      navigate("/error");
    } else {
      // const data = await response.json();
      navigate("/");
    }
  }

  return (
    <main>
      <p>Login</p>
      <form onSubmit={handleSubmit(submitLoginData)}>
        <input type="text" {...register("username", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <input type="submit" value="Login" />
        <section>
          {errors.username && <span>Please provide username</span>}
          {errors.password && <span>Please provide password</span>}
          {authError ? <span>{authError}</span> : null}
        </section>
        <Link to="/sign_up">New here? Sign up</Link>
        <GuestLoginLink />
      </form>
    </main>
  );
}
