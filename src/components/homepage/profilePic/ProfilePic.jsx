export function ProfilePic({ URL }) {
  const DEFAULT_ICON_PATH = "../../../assets/user.svg";
  if (URL === "") return <img src={DEFAULT_ICON_PATH} alt="" />;
  else {
    return <img src={URL} alt="" />;
  }
}
