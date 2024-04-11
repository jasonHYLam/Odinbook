import { Link } from "react-router-dom";
export function PostPreview({ post }) {
  return (
    <>
      <Link to={`/posts/${post.id}`}>
        <article>
          <img src={post.creator.profilePicURL} alt="" />
          <p>{post.creator.username}</p>
          <p>{post.text}</p>
          <p>{post.datePosted}</p>
          <p>{post.likesCount}</p>
        </article>
      </Link>
    </>
  );
}
