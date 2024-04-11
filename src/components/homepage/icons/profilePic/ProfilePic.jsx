import styles from "./ProfilePic.module.css";
import DEFAULT_ICON_PATH from "../../../../assets/user.svg";

export function ProfilePic({ URL, component }) {
  console.log("checking profilePicURL");
  console.log(URL);
  console.log(URL === "");
  console.log(DEFAULT_ICON_PATH);
  let CLASSNAME = "";
  if (component === "comment" || component === "post") {
    CLASSNAME = styles.profilePicSmall;
  } else if (component === "profile") {
    CLASSNAME = styles.profilePicLarge;
  }

  if (URL === "") {
    return <img className={CLASSNAME} src={DEFAULT_ICON_PATH} alt="" />;
  } else {
    return <img className={CLASSNAME} src={URL} alt="" />;
  }
}
