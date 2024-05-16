import { useOutletContext } from "react-router-dom";
import { PostsContainer } from "../postsContainer/PostsContainer";

export function Feed() {
  const { feed } = useOutletContext();
  return (
    <>
      <main>
        <h2>Your feed</h2>

        <PostsContainer posts={feed} />
      </main>
    </>
  );
}
