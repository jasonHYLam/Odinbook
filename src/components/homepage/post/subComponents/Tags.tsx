import styles from "./tags.module.css";

interface Tag {
  id: string;
  name: string;
}

interface TagsProps {
  tags: Tag[];
}

export function Tags({ tags }: TagsProps) {
  return tags.map((tag) => (
    <span className={styles.tag} key={tag.id}>{`#${tag.name}`}</span>
  ));
}
