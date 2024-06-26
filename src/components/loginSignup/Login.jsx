import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../helper/helperUtils";
import { useState } from "react";
import { GuestLoginLink } from "./GuestLoginLink";
import { Logo } from "../homepage/icons/logo/Logo";
import styles from "./LoginSignup.module.css";
import { useMobileView } from "../../helper/hooks";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const isMobileView = useMobileView();

  const [authError, setAuthError] = useState(null);
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const SUBMIT_BUTTON_TEXT = isSuccessfulSubmit ? "Loading" : "Login";

  async function submitLoginData(data) {
    if (isSuccessfulSubmit) return;
    setIsSuccessfulSubmit(true);
    const dataToSubmit = JSON.stringify(data);
    const response = await fetchData("auth/login", "POST", dataToSubmit);
    if (response.status === 401) {
      setAuthError("Incorrect username/password");
      setIsSuccessfulSubmit(false);
    } else if (!response.ok || response instanceof Error) {
      navigate("/error");
    } else {
      navigate("/");
    }
  }

  return (
    <main>
      <section className={styles.page}>
        <section className={styles.logoAndForm}>
          <div className={styles.logo}>
            <Logo size="large" />
          </div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(submitLoginData)}
          >
            <h1>Tabasco</h1>
            <h2>Login</h2>
            <input
              className={styles.input}
              type="text"
              {...register("username", { required: true })}
              placeholder="Username"
            />
            <input
              className={styles.input}
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            <input
              className={styles.submit}
              type="submit"
              value={SUBMIT_BUTTON_TEXT}
            />
            <section className={styles.errorsList}>
              {errors.username && (
                <span className={styles.error}>Please provide username</span>
              )}
              {errors.password && (
                <span className={styles.error}>Please provide password</span>
              )}
              {authError ? (
                <span className={styles.error}>{authError}</span>
              ) : null}
            </section>
            <GuestLoginLink />
            <Link className={styles.link} to="/sign_up">
              <span>New here? Sign up</span>
            </Link>
          </form>
        </section>
      </section>
    </main>
  );
}
