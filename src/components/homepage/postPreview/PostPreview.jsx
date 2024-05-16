import styles from "./PostPreview.module.css";
import { Link } from "react-router-dom";
import { ProfilePic } from "../icons/profilePic/ProfilePic";

// create default thumbnail if doesn't exist
// create some stuff here i guess...
// check properties of post in backend
export function PostPreview({ post }) {
  return (
    <>
      <Link to={`/posts/${post.id}`}>
        <article className={styles.postPreview}>
          <div>
            {post.thumbnailImageURL ? (
              <img className={styles.img} src={post.thumbnailImageURL} />
            ) : null}
            <p className={styles.text}>{post.title}</p>
            <div className={styles.topRow}>
              <ProfilePic URL={post.creator.profilePicURL} size="small" />
              <span className={styles.username}>{post.creator.username}</span>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}
