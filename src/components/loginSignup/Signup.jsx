import { fetchData } from "../../helper/helperUtils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export function Signup() {
  const USERNAME_MIN = 3;
  const USERNAME_MAX = 25;
  const PASSWORD_MIN = 3;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function submitSignupData(data) {
    const dataToSubmit = JSON.stringify(data);
    const response = await fetchData("auth/signup", "POST", dataToSubmit);
    if (!response.ok || response instanceof Error) {
      navigate("/error");
    } else {
      // const data = await response.json();
      navigate("/");
    }
  }

  return (
    <main>
      <p>Signup</p>
      <form onSubmit={handleSubmit(submitSignupData)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: true,
            minLength: USERNAME_MIN,
            maxLength: USERNAME_MAX,
          })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: PASSWORD_MIN,
          })}
        />

        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: true,
            validate: (val) => {
              if (getValues("password") !== val) {
                return "Passwords don't match";
              }
            },
          })}
        />

        <input type="submit" value="Sign up" />
        <section>
          {errors.username && errors.username.type === "required" && (
            <span>Please provide username</span>
          )}

          {errors.username && errors.username.type === "minLength" && (
            <span>Username must be at least {USERNAME_MIN} characters</span>
          )}

          {errors.username && errors.username.type === "maxLength" && (
            <span>Username must be less than {USERNAME_MAX} characters</span>
          )}

          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <span>Please confirm password</span>
            )}

          {errors.password && errors.password.type === "minLength" && (
            <span>Password must be at least {PASSWORD_MIN} characters </span>
          )}

          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <span>{errors.confirmPassword.message}</span>
            )}
        </section>
        <Link to="/login">Got an account? Login</Link>
      </form>
    </main>
  );
}
