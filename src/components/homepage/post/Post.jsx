import styles from "./Post.module.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import {
  useNavigate,
  useOutletContext,
  useParams,
  Link,
} from "react-router-dom";
import { Tags } from "./subComponents/Tags";
import { IconsContainer } from "./subComponents/IconsContainer";
import { CommentSection } from "./subComponents/CommentSection";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import { Loading } from "../../loading/Loading";

export function Post() {
  const { loggedInUser } = useOutletContext();

  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [tags, setTags] = useState([]);

  let CREATOR_PROFILE_URL = "";
  if (!isLoading) {
    CREATOR_PROFILE_URL =
      loggedInUser._id === post.creator._id
        ? "/me"
        : `/users/${post.creator._id}`;
  }

  useEffect(() => {
    async function fetchPostAndComments() {
      const getResponse = await fetchData(`post/${postID}`, "GET");

      if (getResponse.status === 401) {
        navigate("/login");
      } else if (!getResponse.ok || getResponse instanceof Error) {
        navigate("/error");
      } else {
        const { post, comments, isLiked, isBookmarked, tags } =
          await getResponse.json();
        setPost(post);
        setComments(comments);
        setLikesCount(post.likesCount);
        setIsLiked(isLiked);
        setIsLoading(false);
        setIsBookmarked(isBookmarked);
        setBookmarksCount(post.bookmarksCount);
        setTags(tags);
      }
    }

    fetchPostAndComments();
  }, [navigate, postID]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main>
            <section className={styles.postSection}>
              <section>
                <Link to={CREATOR_PROFILE_URL} className={styles.profileInfo}>
                  <ProfilePic URL={post.creator.profilePicURL} size="small" />
                  <span>{post.creator.username}</span>
                  <span className={styles.date}>
                    {post.datePostedFormatted}
                  </span>
                </Link>
              </section>

              {post.imageURL ? (
                <img className={styles.img} src={post.imageURL} alt="" />
              ) : null}

              <p className={styles.title}>{post.title}</p>
              <p className={styles.description}>{post.description}</p>

              <section>
                <Tags tags={tags} />

                <IconsContainer
                  postID={postID}
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                  likesCount={likesCount}
                  setLikesCount={setLikesCount}
                  isBookmarked={isBookmarked}
                  setIsBookmarked={setIsBookmarked}
                  bookmarksCount={bookmarksCount}
                  setBookmarksCount={setBookmarksCount}
                />
              </section>
            </section>

            <CommentSection
              postID={postID}
              comments={comments}
              setComments={setComments}
            />
          </main>
        </>
      )}
    </>
  );
}
