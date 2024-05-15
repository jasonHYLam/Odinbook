import CreatableSelect from "react-select/creatable";
import { useTags } from "../../../../helper/hooks";
export function TagInput({ setSelectedTags }) {
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
