import styles from "./LoginSignup.module.css";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../helper/helperUtils";

export function GuestLoginLink() {
  const navigate = useNavigate();
  async function guestLogin() {
    const guestLoginDetails = JSON.stringify({
      username: import.meta.env.VITE_GUEST_USERNAME,
      password: import.meta.env.VITE_GUEST_PASSWORD,
    });

    const guestLoginResponse = await fetchData(
      "auth/login",
      "POST",
      guestLoginDetails
    );
    if (!guestLoginResponse.ok || guestLoginResponse instanceof Error) {
      navigate("/error");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <p className={styles.guestLogin} onClick={guestLogin}>
        Try Guest account!
      </p>
    </>
  );
}
