import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchData, fetchDataWithImage } from "../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";
import { DisplayImage } from "./DisplayImage";
import styles from "./CreatePost.module.css";

export function CreatePost() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [imagesToUpload, setImagesToUpload] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postText, setPostText] = useState("");
  const CHAR_LIMIT = 500;
  const remainingChars = CHAR_LIMIT - postText.length;
  function exceededCharLimit() {
    return CHAR_LIMIT - postText.length < 0;
  }

  function selectImage(e) {
    setImagesToUpload(e.target.files[0]);
  }

  async function post(data) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (imagesToUpload) {
      const postData = new FormData();
      postData.append("images", imagesToUpload);
      postData.append("text", postText);

      const postResponse = await fetchDataWithImage(
        `post/create_post_with_image`,
        "POST",
        postData
      );
      if (!postResponse.ok || postResponse instanceof Error) {
        navigate("/error");
      } else {
        const { newPost } = await postResponse.json();
        navigate(`/posts/${newPost.id}`);
      }
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

  return (
    <main>
      <h2>Creating post</h2>
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={handleSubmit(post)}
      >
        <DisplayImage
          imageURL={imagesToUpload ? URL.createObjectURL(imagesToUpload) : null}
        />
        {/* <img
          className={styles.displayImage}
          src={imagesToUpload ? URL.createObjectURL(imagesToUpload) : ""}
          alt=""
        /> */}

        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Character limit 500"
          {...register("text", { required: true, maxLength: 500 })}
          value={postText}
          onChange={(e) => {
            if (postText.length > 0 || postText.length < 500) clearErrors();
            setPostText(e.target.value);
          }}
        ></textarea>
        <section className={styles.buttonRow}>
          <input type="file" onChange={selectImage} />
          <p className={styles.subText}>
            {exceededCharLimit()
              ? "Exceeded maximum post length"
              : remainingChars}
          </p>

          <input type="submit" value="Post" />
        </section>

        {errors.text && errors.text.type === "required" && (
          <span className={styles.error}>Cannot send empty post</span>
        )}
        {errors.text && errors.text.type === "maxLength" && (
          <span className={styles.error}>Exceeded 500 characters</span>
        )}
      </form>
    </main>
  );
}
