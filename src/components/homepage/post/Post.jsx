import styles from "./Post.module.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import {
  useNavigate,
  useOutletContext,
  useParams,
  Link,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Comment } from "./Comment";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import { LikeIcon } from "../icons/like/LikeIcon";
import { Bookmark } from "../icons/bookmark/Bookmark";
import { Loading } from "../../loading/Loading";

export function Post() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const {
    loggedInUser,
    likedPosts,
    setLikedPosts,
    bookmarkedPosts,
    setBookmarkedPosts,
  } = useOutletContext();

  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingLike, setIsSubmittingLike] = useState(false);
  const [isSubmittingUnlike, setIsSubmittingUnlike] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [isSubmittingBookmark, setIsSubmittingBookmark] = useState(false);

  const [commentText, setCommentText] = useState("");

  const CHAR_LIMIT = 100;
  const remainingChars = CHAR_LIMIT - commentText.length;
  function exceededCharLimit() {
    return CHAR_LIMIT - commentText.length < 0;
  }

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
        const { post, comments, isLiked, isBookmarked } =
          await getResponse.json();
        setPost(post);
        setComments(comments);
        setLikesCount(post.likesCount);
        setIsLiked(isLiked);
        setIsLoading(false);
        setIsBookmarked(isBookmarked);
        setBookmarksCount(post.bookmarksCount);
      }
    }

    fetchPostAndComments();
  }, [navigate, postID]);

  async function likePost() {
    if (isSubmittingLike) return;
    setIsSubmittingLike(true);
    const likePostResponse = await fetchData(`post/${postID}/like`, "PUT");
    if (!likePostResponse.ok || likePostResponse instanceof Error) {
      navigate("/error");
    } else {
      const { likedPost } = await likePostResponse.json();
      setLikesCount(likesCount + 1);
      setIsLiked(true);
      setIsSubmittingLike(false);
      setLikedPosts([...likedPosts, likedPost]);
    }
  }

  async function unlikePost() {
    if (isSubmittingUnlike) return;
    setIsSubmittingUnlike(true);
    const unlikePostResponse = await fetchData(`post/${postID}/unlike`, "PUT");
    if (!unlikePostResponse.ok || unlikePostResponse instanceof Error) {
      navigate("/error");
    } else {
      const { unlikedPost } = await unlikePostResponse.json();
      setLikesCount(likesCount - 1);
      setIsLiked(false);
      setIsSubmittingUnlike(false);

      const updatedLikedPosts = likedPosts.filter(
        (post) => post._id !== unlikedPost._id
      );

      setLikedPosts(updatedLikedPosts);
    }
  }

  async function toggleBookmarkPost() {
    isBookmarked ? setIsBookmarked(false) : setIsBookmarked(true);

    const response = await fetchData(`${postID}/toggle_bookmark_post`, "PUT");

    if (!response.ok || response instanceof Error) {
      navigate("/error");
    } else {
      const { matchingPost } = await response.json();
      setBookmarkedPosts(...bookmarkedPosts, matchingPost);
    }
  }

  async function postComment(data) {
    if (isSubmittingComment) return;
    setIsSubmittingComment(true);
    const dataToSubmit = JSON.stringify(data);
    const commentResponse = await fetchData(
      `comment/${postID}/comment`,
      "POST",
      dataToSubmit
    );
    if (!commentResponse.ok || commentResponse instanceof Error) {
      navigate("/error");
    } else {
      const { newComment } = await commentResponse.json();
      reset();
      setComments([...comments, newComment]);
      setIsSubmittingComment(false);
    }
  }

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

              <p className={styles.postText}>{post.text}</p>

              <section>
                <div
                  onClick={() => {
                    isLiked ? unlikePost() : likePost();
                  }}
                >
                  <LikeIcon isLiked={isLiked} />
                  <span className={styles.likesCount}>{likesCount}</span>
                </div>
                <div>
                  <Bookmark />
                </div>
              </section>
            </section>

            <section>
              <section>
                <h3>Comments</h3>
                <form onSubmit={handleSubmit(postComment)}>
                  {errors.text && errors.text.type === "required" && (
                    <span>Please write a comment</span>
                  )}
                  {errors.text && errors.text.type === "maxLength" && (
                    <span>Character limit is 100</span>
                  )}
                  <section className={styles.writeCommentSection}>
                    <input
                      className={styles.writeComment}
                      type="text"
                      placeholder="Write a comment!"
                      {...register("text", { required: true, maxLength: 100 })}
                      value={commentText}
                      onChange={(e) => {
                        if (commentText > 0 || commentText < 100)
                          clearErrors("text");
                        setCommentText(e.target.value);
                      }}
                    />
                    <input type="submit" />
                  </section>
                  <p className={styles.subText}>
                    {exceededCharLimit()
                      ? "Exceeded character limit"
                      : remainingChars}
                  </p>
                </form>
              </section>
              {!comments.length ? (
                <p className={styles.subText}>
                  No comments. Be the first to comment!
                </p>
              ) : (
                <ul>
                  {comments.map((comment) =>
                    !comment.isDeleted ? (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        postID={post._id}
                        setComments={setComments}
                        allPostComments={comments}
                      />
                    ) : null
                  )}
                </ul>
              )}
            </section>
          </main>
        </>
      )}
    </>
  );
}
