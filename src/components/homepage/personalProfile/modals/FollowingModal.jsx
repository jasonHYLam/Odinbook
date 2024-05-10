import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ProfilePic } from "../../icons/profilePic/ProfilePic";
import styles from "./Modal.module.css";

export function FollowingModal({ following, openModal, closeModal }) {
  const ref = useRef();

  function escapePress(e) {
    if (e.key === "Escape") closeModal();
  }

  document.addEventListener("keydown", escapePress);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);
  return (
    <dialog ref={ref} className={styles.modal}>
      <button onClick={closeModal}>close</button>
      <p>Following</p>
      <section>
        <ul>
          {following.map((user) => {
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
      </section>
    </dialog>
  );
}
