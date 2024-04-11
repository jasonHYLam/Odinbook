import styles from "./ProfilePic.module.css";

export function ProfilePic({ URL, component }) {
  let CLASSNAME = "";
  if (component === "comment" || component === "post") {
    CLASSNAME = styles.profilePicSmall;
  } else if (component === "profile") {
    CLASSNAME = styles.profilePicLarge;
  }

  console.log("checking classname");

  const DEFAULT_ICON_PATH = "../../../assets/user.svg";
  if (URL === "") {
    return <img className={CLASSNAME} src={DEFAULT_ICON_PATH} alt="" />;
  } else {
    return <img className={CLASSNAME} src={URL} alt="" />;
  }
}
