import { useEffect, useRef, useState } from "react";
import { EditUserForm } from "./EditUserForm";

export function SettingsModal({ openModal, closeModal }) {
  const [editing, setEditing] = useState("");

  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  function escapePress(e) {
    if (e.key === "Escape") closeModal();
  }

  document.addEventListener("keydown", escapePress);

  return (
    <dialog ref={ref}>
      <button
        onClick={() => {
          setEditing(null);
          closeModal();
        }}
      >
        close
      </button>

      <p onClick={() => setEditing("username")}>Change username</p>
      {editing === "username" ? (
        <EditUserForm editing={"username"} cancel={() => setEditing("")} />
      ) : null}

      <p onClick={() => setEditing("password")}>Change password</p>
      {editing === "password" ? (
        <EditUserForm editing={"password"} cancel={() => setEditing("")} />
      ) : null}

      <p>Change profile picture</p>
    </dialog>
  );
}
