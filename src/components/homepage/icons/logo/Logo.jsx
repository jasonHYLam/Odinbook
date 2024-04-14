import styles from "./Logo.module.css";
import LOGO from "../../../../assets/handLogo.png";

export function Logo({ size }) {
  let CLASSNAME;
  if (size === "small") {
    CLASSNAME = styles.logoSmall;
  } else if (size === "large") {
    CLASSNAME = styles.logoLarge;
  }
  return <img className={CLASSNAME} src={LOGO} />;
}
