import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchDataWithImage } from "../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { DisplayImage } from "./DisplayImage";
import { useTags } from "../../../helper/hooks";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fileInputRef = useRef(null);

  const TITLE_LIMIT = 30;
  const DESCRIPTION_LIMIT = 500;
  const remainingTitleChars = TITLE_LIMIT - title.length;
  const remainingDescriptionChars = DESCRIPTION_LIMIT - description.length;

  const exceededTitleLimit = () => TITLE_LIMIT - title.length < 0;
  const exceededDescriptionLimit = () =>
    DESCRIPTION_LIMIT - description.length < 0;

  function selectImage(e) {
    setImagesToUpload(e.target.files[0]);
  }

  const { ref: registerRef, ...rest } = register("image", {
    required: true,
  });

  async function post() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const postData = new FormData();
    postData.append("images", imagesToUpload);
    postData.append("title", title);
    postData.append("description", description);

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
        <button onClick={() => fileInputRef.current.click()}>
          {imagesToUpload ? "Change image" : "Upload image"}
        </button>
        <input
          className={styles.imageInput}
          type="file"
          {...rest}
          onChange={selectImage}
          ref={(input) => {
            registerRef(input);
            fileInputRef.current = input;
          }}
        />

        <p className={styles.subText}>
          {exceededTitleLimit() ? "Exceeded title limit" : remainingTitleChars}
        </p>
        <input
          type="text"
          {...register("title", { required: true, maxLength: 30 })}
          placeholder="Give your post a name! (required)"
          value={title}
          onChange={(e) => {
            if (title.length > 0 || title.length < 30) clearErrors();
            setTitle(e.target.value);
          }}
        />

        <input type="text" placeholder="Add tags" />
        <select name="" id=""></select>
        <Select />

        <p className={styles.subText}>
          {exceededDescriptionLimit()
            ? "Exceeded description limit"
            : remainingDescriptionChars}
        </p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Add your thoughts!"
          {...register("description", { maxLength: 500 })}
          value={description}
          onChange={(e) => {
            if (description.length > 0 || description.length < 500)
              clearErrors();
            setDescription(e.target.value);
          }}
        ></textarea>
        <section className={styles.buttonRow}>
          <input type="submit" value="Post" disabled={isSubmitting} />
        </section>

        {errors.image && errors.image.type === "required" && (
          <span className={styles.error}>Missing upload</span>
        )}

        {errors.title && errors.title.type === "required" && (
          <span className={styles.error}>Post requires a title</span>
        )}

        {errors.title && errors.title.type === "maxLength" && (
          <span className={styles.error}>Title too long</span>
        )}

        {errors.description && errors.description.type === "maxLength" && (
          <span className={styles.error}>Description too long</span>
        )}
      </form>
    </main>
  );
}
