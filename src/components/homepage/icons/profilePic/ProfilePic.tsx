import styles from "./ProfilePic.module.css";
import DEFAULT_ICON_PATH from "../../../../assets/user.svg";

interface ProfilePicProps {
  URL: string;
  size: string;
}

export function ProfilePic({ URL, size }: ProfilePicProps) {
  let CLASSNAME = "";
  if (size === "small") {
    CLASSNAME = styles.profilePicSmall;
  } else if (size === "large") {
    CLASSNAME = styles.profilePicLarge;
  }

  if (URL === "") {
    return <img className={CLASSNAME} src={DEFAULT_ICON_PATH} alt="" />;
  } else {
    return <img className={CLASSNAME} src={URL} alt="" />;
  }
}
