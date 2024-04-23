import { fetchData } from "../../helper/helperUtils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { GuestLoginLink } from "./GuestLoginLink";
import { Logo } from "../homepage/icons/logo/Logo";
import styles from "./LoginSignup.module.css";

export function Signup() {
  const USERNAME_MIN = 3;
  const USERNAME_MAX = 25;
  const PASSWORD_MIN = 3;

  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function submitSignupData(data) {
    const dataToSubmit = JSON.stringify(data);
    const response = await fetchData("auth/signup", "POST", dataToSubmit);
    if (response instanceof Error) {
      console.log("network error");
      navigate("/error");
    }
    const responseData = await response.json();
    if (responseData.error && responseData.error === "Username already taken") {
      setUsernameError(responseData.error);
    } else if (!response.ok) {
      navigate("/error");
    } else {
      navigate("/login");
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.logoAndForm}>
        <div className={styles.logo}>
          <Logo size="large" />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(submitSignupData)}>
          <h1>Tabasco</h1>
          <h2>Signup</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
              minLength: USERNAME_MIN,
              maxLength: USERNAME_MAX,
              onChange: () => {
                if (usernameError !== "") setUsernameError("");
              },
            })}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: PASSWORD_MIN,
              onChange: () => {
                if (usernameError !== "") setUsernameError("");
              },
            })}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: true,
              validate: (val) => {
                if (getValues("password") !== val) {
                  return "Passwords don't match";
                }
              },
              onChange: () => {
                if (usernameError !== "") setUsernameError("");
              },
            })}
          />

          <input className={styles.submit} type="submit" value="Sign up" />
          <section className={styles.errorsList}>
            {errors.username && errors.username.type === "required" && (
              <span className={styles.error}>Please provide username</span>
            )}

            {errors.username && errors.username.type === "minLength" && (
              <span className={styles.error}>
                Username must be at least {USERNAME_MIN} characters
              </span>
            )}

            {errors.username && errors.username.type === "maxLength" && (
              <span className={styles.error}>
                Username must be less than {USERNAME_MAX} characters
              </span>
            )}

            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <span className={styles.error}>Please confirm password</span>
              )}

            {errors.password && errors.password.type === "minLength" && (
              <span className={styles.error}>
                Password must be at least {PASSWORD_MIN} characters{" "}
              </span>
            )}

            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              )}

            {usernameError !== "" ? (
              <span className={styles.error}>usernameError</span>
            ) : null}
          </section>
          <GuestLoginLink />
          <Link to="/login">
            <span className={styles.link}>Got an account? Login</span>
          </Link>
        </form>
      </section>
    </main>
  );
}
