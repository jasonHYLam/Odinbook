import styles from "./inputs.module.css";
import {
  UseFormRegister,
  FieldValues,
  UseFormClearErrors,
} from "react-hook-form";

interface TitleInputProps {
  register: UseFormRegister<FieldValues>;
  title: string;
  setTitle: (title: string) => void;
  clearErrors: UseFormClearErrors<FieldValues>;
}

export function TitleInput({
  register,
  title,
  setTitle,
  clearErrors,
}: TitleInputProps) {
  const TITLE_LIMIT = 30;
  const remainingTitleChars = TITLE_LIMIT - title.length;
  const exceededTitleLimit = () => TITLE_LIMIT - title.length < 0;

  return (
    <>
      <div className={styles.textInputContainer}>
        <p className={`${styles.subText} ${styles.characterCount}`}>
          {exceededTitleLimit() ? "Exceeded title limit" : remainingTitleChars}
        </p>

        <input
          className={styles.textInput}
          type="text"
          {...register("title", { required: true, maxLength: 30 })}
          placeholder="Give your post a name! (required)"
          value={title}
          onChange={(e) => {
            if (title.length > 0 || title.length < 30) clearErrors();
            setTitle(e.target.value);
          }}
        />
      </div>
    </>
  );
}
