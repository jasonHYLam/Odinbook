import { PostPreview } from "../postPreview/PostPreview";
import styles from "./postsContainer.module.css";

export function PostsContainer({ posts }) {
  return (
    <section className={styles.postsContainer}>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </section>
  );
}
