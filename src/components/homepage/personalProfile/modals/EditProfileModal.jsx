import { useEffect, useRef, useState } from "react";
import { EditUserForm } from "./EditUserForm";
import { EditProfilePicForm } from "./EditProfilePicForm";

export function EditProfileModal({ openModal, closeModal }) {
  const [editing, setEditing] = useState("");
  // const [imageToUpload, setImageToUpload] = useState(null);

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

  // function selectImageToUpload(e) {
  //   setImageToUpload(e.target.files[0]);
  // }

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

      <p onClick={() => setEditing("profilePic")}>Change profile picture</p>
      {editing === "profilePic" ? (
        <EditProfilePicForm
          cancel={() => {
            setEditing("");
          }}
        />
      ) : // (
      // <form encType="multipart/form-data">
      //   <button onClick={() => setEditing("")}>cancel</button>
      //   <label htmlFor="">
      //     <input type="file" onChange={selectImageToUpload} />
      //   </label>
      //   <input type="submit" />
      // </form>
      // )
      null}
    </dialog>
  );
}
