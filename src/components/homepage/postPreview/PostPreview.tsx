import styles from "./PostPreview.module.css";
import { Link, useOutletContext } from "react-router-dom";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import { PostType, UserType } from "../../../helper/types";

interface PostPreviewProps {
  post: PostType;
}

interface OutletContextForPostPreview {
  loggedInUser: UserType;
}

export function PostPreview({ post }: PostPreviewProps) {
  const { loggedInUser } = useOutletContext<OutletContextForPostPreview>();

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
