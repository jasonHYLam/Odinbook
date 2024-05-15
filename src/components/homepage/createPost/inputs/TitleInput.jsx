import styles from "./inputs.module.css";

export function TitleInput({ register, title, setTitle, clearErrors }) {
  const TITLE_LIMIT = 30;
  const remainingTitleChars = TITLE_LIMIT - title.length;
  const exceededTitleLimit = () => TITLE_LIMIT - title.length < 0;

  return (
    <>
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
    </>
  );
}
