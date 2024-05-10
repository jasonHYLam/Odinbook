import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ProfilePic } from "../../icons/profilePic/ProfilePic";
export function FollowersModal({ followers, openModal, closeModal }) {
  const ref = useRef();

  function escapePress(e) {
    if (e.key === "Escape") closeModal();
  }

  document.addEventListener("keydown", escapePress);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref}>
      <button onClick={closeModal}>close</button>
      <p>Followers</p>
      <ul>
        {followers.map((user) => {
          return (
            <Link to={`/users/${user.id}`} key={user.id}>
              <article>
                <ProfilePic URL={user.profilePic} size="small" />
                <p>{user.username}</p>
              </article>
            </Link>
          );
        })}
      </ul>
    </dialog>
  );
}
