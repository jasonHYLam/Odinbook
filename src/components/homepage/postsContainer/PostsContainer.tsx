import { PostType } from "../../../helper/types";
import { PostPreview } from "../postPreview/PostPreview";
import styles from "./postsContainer.module.css";

interface PostsContainerProps {
  posts: PostType[];
}

export function PostsContainer({ posts }: PostsContainerProps) {
  return (
    <section className={styles.postsContainer}>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </section>
  );
}
