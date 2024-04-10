import { Link } from "react-router-dom";
export function Comment({ comment }) {
  return (
    <>
      <article>
        <Link>
          <img src={comment.author.profilePicURL} alt="" />
          <span>{comment.author.username}</span>
        </Link>

        <p>{comment.text}</p>
        <p>{comment.dateCommented}</p>
        <button>edit</button>
        <button>delete</button>
      </article>
    </>
  );
}
