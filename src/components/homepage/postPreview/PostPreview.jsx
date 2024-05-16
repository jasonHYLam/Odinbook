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
          <ProfilePic URL={post.creator.profilePicURL} size="small" />
          <div>
            <div className={styles.topRow}>
              <span>{post.creator.username}</span>
              <span className={styles.date}>{post.datePostedFormatted}</span>
            </div>

            {post.thumbnailImageURL ? (
              // <img className={styles.img} src={post.imageURL} />
              <img className={styles.img} src={post.thumbnailImageURL} />
            ) : null}
            {/* <p className={styles.text}>{post.text}</p> */}
            <p className={styles.text}>{post.title}</p>
            <p className={styles.likesCount}>{post.likesCount}</p>
          </div>
        </article>
      </Link>
    </>
  );
}
