import { Link, useParams } from "react-router-dom";
export function PostPreview({ post }) {
  return (
    <>
      <Link to={`/posts/${post.id}`}>
        <article>
          <p>{post.creator.username}</p>
          <p>{post.text}</p>
          <p>{post.datePosted}</p>
        </article>
      </Link>
    </>
  );
}
