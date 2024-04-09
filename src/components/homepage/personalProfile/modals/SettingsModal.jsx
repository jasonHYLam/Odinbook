import { useEffect, useRef } from "react";

export function SettingsModal({ openModal, closeModal }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref}>
      <p>Change username</p>
      <p>Change password</p>
      <p>Change profile picture</p>
    </dialog>
  );
}
