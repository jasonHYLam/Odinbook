import styles from "./inputs.module.css";
import {
  UseFormRegister,
  FieldValues,
  UseFormClearErrors,
} from "react-hook-form";

interface DescriptionInputProps {
  register: UseFormRegister<FieldValues>;
  description: string;
  setDescription: (title: string) => void;
  clearErrors: UseFormClearErrors<FieldValues>;
}

export function DescriptionInput({
  register,
  description,
  setDescription,
  clearErrors,
}: DescriptionInputProps) {
  const DESCRIPTION_LIMIT = 500;
  const remainingDescriptionChars = DESCRIPTION_LIMIT - description.length;
  const exceededDescriptionLimit = () =>
    DESCRIPTION_LIMIT - description.length < 0;

  return (
    <>
      <div className={styles.textInputContainer}>
        <p className={`${styles.subText} ${styles.characterCount}`}>
          {exceededDescriptionLimit()
            ? "Exceeded description limit"
            : remainingDescriptionChars}
        </p>
        <textarea
          className={styles.textInput}
          cols={30}
          rows={10}
          placeholder="Add your thoughts!"
          {...register("description", { maxLength: 500 })}
          value={description}
          onChange={(e) => {
            if (description.length > 0 || description.length < 500)
              clearErrors();
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
    </>
  );
}
