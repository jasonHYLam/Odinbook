import { useState } from "react";
import { fetchData } from "../../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";

export function EditProfilePicForm({ cancel }) {
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

    const uploadResponse = await fetchData(
      `user/change_profile_pic`,
      "PUT",
      data
    );
    if (!uploadResponse.ok || uploadResponse instanceof Error) {
      navigate("/error");
    } else {
      console.log("somehow worked?");
      const { user } = await uploadResponse.json();
      console.log(user);
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
