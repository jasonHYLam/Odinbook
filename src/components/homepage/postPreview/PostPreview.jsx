import styles from "./PostPreview.module.css";
import { Link } from "react-router-dom";
import { ProfilePic } from "../icons/profilePic/ProfilePic";

export function PostPreview({ post }) {
  return (
    <>
      <Link to={`/posts/${post.id}`}>
        <article className={styles.postPreview}>
          <ProfilePic URL={post.creator.profilePicURL} component="post" />
          <img className={styles.profilePic} src={post.creator.profilePicURL} />
          <div>
            <div className={styles.topRow}>
              <span>{post.creator.username}</span>
              <span className={styles.date}>{post.datePosted}</span>
            </div>
            <p>{post.text}</p>
            <p className={styles.likesCount}>{post.likesCount}</p>
          </div>
        </article>
      </Link>
    </>
  );
}
