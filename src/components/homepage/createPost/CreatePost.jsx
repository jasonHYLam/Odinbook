import { useState } from "react";
import { useForm } from "react-hook-form";

export function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [text, setText] = useState("");

  function selectImages() {
    setImagesToUpload(e.target.files);
  }

  async function post(data) {
    if (imagesToUpload) return;
    console.log("checking data");
    console.log(data);
  }

  return (
    <main>
      <p>it's me createPost</p>
      <form encType="multipart/form-data" onSubmit={handleSubmit(post)}>
        <input type="file" multiple onChange={selectImages} />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          {...register("text", { required: true })}
        ></textarea>
        <input type="submit" value="Post" />
      </form>
    </main>
  );
}
