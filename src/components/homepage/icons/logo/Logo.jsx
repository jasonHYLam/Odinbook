import styles from "./Logo.module.css";
// import LOGO from "../../../assets/handLogo.png";
import LOGO from "../../../../assets/handLogo.png";

export function Logo() {
  return <img className={styles.logo} src={LOGO} />;
}
