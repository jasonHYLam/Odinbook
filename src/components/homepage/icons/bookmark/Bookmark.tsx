import styles from "./Bookmark.module.css";

interface BookmarkProps {
  isBookmarked: boolean;
}
export function Bookmark({ isBookmarked }: BookmarkProps) {
  const bookmarkStyle = isBookmarked ? "bookmarked" : "unbookmarked";

  return (
    <div className={styles[bookmarkStyle]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
      </svg>
    </div>
  );
}
