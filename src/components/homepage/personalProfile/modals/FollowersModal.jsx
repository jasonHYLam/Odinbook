import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
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
  });

  return (
    <dialog ref={ref}>
      <p>Followers</p>
      <ul>
        {followers.map((user) => {
          <Link to={user.id}>
            <article>
              <p>{user.username}</p>
            </article>
          </Link>;
        })}
      </ul>
    </dialog>
  );
}
