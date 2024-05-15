import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchDataWithImage } from "../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";
import { TagInput } from "./inputs/TagInput";
import { TitleInput } from "./inputs/TitleInput";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const fileInputRef = useRef(null);

  // const DESCRIPTION_LIMIT = 500;
  // const remainingDescriptionChars = DESCRIPTION_LIMIT - description.length;

  // const exceededDescriptionLimit = () =>
  //   DESCRIPTION_LIMIT - description.length < 0;

  function selectImage(e) {
    setImagesToUpload(e.target.files[0]);
  }

  const { ref: registerRef, ...rest } = register("image", {
    required: true,
  });

  async function post() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const tags = JSON.stringify(selectedTags.map((tag) => tag.value));
    const postData = new FormData();
    postData.append("images", imagesToUpload);
    postData.append("title", title);
    postData.append("description", description);
    postData.append("tags", tags);

    console.log("postData");
    console.log([...postData]);

    const postResponse = await fetchDataWithImage(
      // `post/create_post_with_image`,
      `post/tag_test`,
      "POST",
      postData
    );

    // if (!postResponse.ok || postResponse instanceof Error) {
    //   navigate("/error");
    // } else {
    //   const { newPost } = await postResponse.json();
    //   navigate(`/posts/${newPost.id}`);
    // }
  }

  async function test(data) {
    console.log("checking data");
    console.log(data);
  }

  return (
    <main>
      <h2>Creating post</h2>
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={handleSubmit(post)}
        // onSubmit={handleSubmit(test)}
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

        <TitleInput
          register={register}
          title={title}
          setTitle={setTitle}
          clearErrors={clearErrors}
        />

        <TagInput setSelectedTags={setSelectedTags} />

        {/* <p className={styles.subText}>
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
        ></textarea> */}
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
