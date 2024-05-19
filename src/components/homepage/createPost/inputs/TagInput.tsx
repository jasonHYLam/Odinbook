import CreatableSelect from "react-select/creatable";
import { useTags } from "../../../../helper/hooks";

interface TagInputProps {
  setSelectedTags: (selectedTags: { label: string; value: string }) => void;
}
export function TagInput({ setSelectedTags }: TagInputProps) {
  // export function TagInput({ setSelectedTags }) {
  const { allTags, tagsLoading } = useTags();

  return (
    <CreatableSelect
      options={
        tagsLoading ? [] : allTags.map((tag) => ({ label: tag, value: tag }))
      }
      styles={{
        input: (baseStyles) => ({
          ...baseStyles,
          borderColor: "",
        }),
      }}
      isMulti
      placeholder="Add tags"
      onChange={setSelectedTags}
    />
  );
}
