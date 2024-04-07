import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";

export function CreatePost() {
  const navigate = useNavigate();
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
    console.log("foo");
    if (imagesToUpload.length) {
      return;
    } else {
      const postData = JSON.stringify(data);
      const postResponse = await fetchData(
        "post/create_post",
        "POST",
        postData
      );
      if (!postResponse.ok || postResponse instanceof Error) {
        navigate("/error");
      } else {
        const { newPost } = await postResponse.json();
        navigate(`/posts/${newPost.id}`);
      }
    }
  }

  if (errors) console.log(errors);

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
        <input type="text" {...register("test")} />
        <input type="submit" value="Post" />
      </form>
    </main>
  );
}
