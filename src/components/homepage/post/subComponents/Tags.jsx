import styles from "./tags.module.css";
export function Tags({ tags }) {
  return tags.map((tag) => (
    <span className={styles.tag} key={tag.id}>{`#${tag.name}`}</span>
  ));
}
