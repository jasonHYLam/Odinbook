import styles from "./inputs.module.css";

export function DescriptionInput({
  register,
  description,
  setDescription,
  clearErrors,
}) {
  const DESCRIPTION_LIMIT = 500;
  const remainingDescriptionChars = DESCRIPTION_LIMIT - description.length;
  const exceededDescriptionLimit = () =>
    DESCRIPTION_LIMIT - description.length < 0;

  return (
    <>
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
          if (description.length > 0 || description.length < 500) clearErrors();
          setDescription(e.target.value);
        }}
      ></textarea>
    </>
  );
}
