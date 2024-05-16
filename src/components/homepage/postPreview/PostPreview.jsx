import styles from "./PostPreview.module.css";
import { Link, useOutletContext } from "react-router-dom";
import { ProfilePic } from "../icons/profilePic/ProfilePic";

// create default thumbnail if doesn't exist
// create some stuff here i guess...
// check properties of post in backend
export function PostPreview({ post }) {
  const { loggedInUser } = useOutletContext();

  const userID =
    loggedInUser.id === post.creator.id ? loggedInUser.id : post.creator.id;

  return (
    <>
      <article className={styles.postPreview}>
        <div>
          <Link to={`/posts/${post.id}`}>
            <div className={styles.thumbnailContainer}>
              {post.thumbnailImageURL ? (
                <img
                  className={styles.thumbnail}
                  src={post.thumbnailImageURL}
                />
              ) : null}
            </div>
          </Link>
          <Link to={`/posts/${post.id}`}>
            <p className={styles.title}>{post.title}</p>
          </Link>
          <Link to={`/users/${userID}`}>
            <div className={styles.topRow}>
              <ProfilePic URL={post.creator.profilePicURL} size="small" />
              <span className={styles.username}>{post.creator.username}</span>
            </div>
          </Link>
        </div>
      </article>
    </>
  );
}
