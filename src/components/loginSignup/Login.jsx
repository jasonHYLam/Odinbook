import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../helper/helperUtils";
import { useState } from "react";

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
    console.log("checking dataToSubmit");
    console.log(dataToSubmit);
    const response = await fetchData("auth/login", "POST", dataToSubmit);
    if (response.status === 401) {
      setAuthError("Incorrect username/password");
    } else if (!response.ok) {
      console.log(response);
      console.log("get it shawty");
    }
    // else if (!response.ok || response instanceof Error) {
    else if (response instanceof Error) {
      console.log("something happened");
      navigate("/error");
    } else {
      console.log("will this happen instantly");
      const data = await response.json();
      console.log(data);

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
      </form>
      <Link to="/sign_up">New here? Sign up</Link>
    </main>
  );
}
