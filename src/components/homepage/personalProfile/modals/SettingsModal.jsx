import { useEffect, useRef } from "react";

export function SettingsModal({ openModal, closeModal }) {
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
    <dialog ref={ref}>
      <button onClick={closeModal}>close</button>
      <p>Change username</p>
      <p>Change password</p>
      <p>Change profile picture</p>
    </dialog>
  );
}
