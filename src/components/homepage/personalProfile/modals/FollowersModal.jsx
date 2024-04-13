import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
export function FollowersModal({ followers, openModal, closeModal }) {
  const ref = useRef();

  function escapePress(e) {
    if (e.key === "Escape") closeModal();
  }

  document.addEventListener("keydown", escapePress);

  console.log("checking followers");
  console.log(followers);

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
            <Link to={`/users/${user.id}`}>
              <article>
                <p>{user.username}</p>
              </article>
            </Link>
          );
        })}
      </ul>
    </dialog>
  );
}
