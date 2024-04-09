import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../../helper/helperUtils";
import { useEffect, useRef } from "react";

export function LogoutModal({ openModal, closeModal }) {
  const ref = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  async function logout() {
    const logoutResponse = await fetchData("auth/logout", "DELETE");
    if (!logoutResponse.ok || logoutResponse instanceof Error) {
      navigate("/error");
    } else {
      navigate("/login");
    }
  }

  function escapePress(e) {
    if (e.key === "Escape") closeModal();
  }

  document.addEventListener("keydown", escapePress);

  return (
    <dialog ref={ref}>
      <p>Are you sure you want to log out?</p>
      <p onClick={logout}>Yeah, log out</p>
      <p onClick={closeModal}>Cancel</p>
    </dialog>
  );
}
