import styles from "./ProfilePic.module.css";

export function ProfilePic({ URL, component }) {
  let CLASSNAME = "";
  if (component === "comment" || component === "post") {
    CLASSNAME = ".profile-pic-s";
  } else if (component === "profile") {
    CLASSNAME = ".profile-pic-l";
  }

  const DEFAULT_ICON_PATH = "../../../assets/user.svg";
  if (URL === "") {
    return (
      <img className={`${styles}${CLASSNAME}`} src={DEFAULT_ICON_PATH} alt="" />
    );
  } else {
    return <img className={`${styles}${CLASSNAME}`} src={URL} alt="" />;
  }
}
