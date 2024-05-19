import styles from "./Logo.module.css";
import LOGO from "../../../../assets/handLogo.png";

interface LogoProps {
  size: string;
}

export function Logo({ size }: LogoProps) {
  let CLASSNAME;
  if (size === "small") {
    CLASSNAME = styles.logoSmall;
  } else if (size === "large") {
    CLASSNAME = styles.logoLarge;
  }
  return <img className={CLASSNAME} src={LOGO} />;
}
