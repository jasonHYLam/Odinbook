import { useState } from "react";
import { fetchDataWithImage } from "../../../../helper/helperUtils";
import { useNavigate, useOutletContext } from "react-router-dom";

export function EditProfilePicForm({ cancel }) {
  const { setLoggedInUser } = useOutletContext();
  const navigate = useNavigate();
  const [imageToUpload, setImageToUpload] = useState(null);

  function selectImageToUpload(e) {
    setImageToUpload(e.target.files[0]);
  }

  async function uploadImage(e) {
    e.preventDefault();
    if (!imageToUpload) return;
    const data = new FormData();
    data.append("profilePic", imageToUpload);

    const uploadResponse = await fetchDataWithImage(
      `user/change_profile_pic`,
      "PUT",
      data
    );
    if (!uploadResponse.ok || uploadResponse instanceof Error) {
      navigate("/error");
    } else {
      const { user } = await uploadResponse.json();
      setLoggedInUser(user);
    }
  }

  return (
    <form encType="multipart/form-data" onSubmit={uploadImage}>
      <button onClick={cancel}>cancel</button>
      <label htmlFor="">
        <input type="file" onChange={selectImageToUpload} />
      </label>
      <input type="submit" />
    </form>
  );
}
