import styles from "./inputs.module.css";
import { DisplayImage } from "./DisplayImage";
import { useRef } from "react";

export function ImageUpload({ imagesToUpload, setImagesToUpload, register }) {
  const fileInputRef = useRef(null);
  const { ref: registerRef, ...rest } = register("image", {
    required: true,
  });

  function selectImage(e) {
    setImagesToUpload(e.target.files[0]);
  }

  return (
    <>
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
    </>
  );
}
