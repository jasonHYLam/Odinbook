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

export function Post() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { loggedInUser, likedPosts, setLikedPosts } = useOutletContext();

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
        const { post, comments, isLiked } = await getResponse.json();
        setPost(post);
        setComments(comments);
        setLikesCount(post.likesCount);
        setIsLiked(isLiked);
        setIsLoading(false);
      }
    }

    fetchPostAndComments();
  }, []);

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
        <p>loading</p>
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
                {isLiked ? (
                  <div onClick={unlikePost} className={styles.liked}>
                    <LikeIcon />
                    <span className={styles.likesCount}>{likesCount}</span>
                  </div>
                ) : (
                  <div onClick={likePost} className={styles.unliked}>
                    <LikeIcon />
                    <span className={styles.likesCount}>{likesCount}</span>
                  </div>
                )}
              </section>
            </section>

            <section>
              <section>
                <form onSubmit={handleSubmit(postComment)}>
                  {errors.text && errors.text.type === "required" && (
                    <span>Please write a comment</span>
                  )}
                  {errors.text && errors.text.type === "maxLength" && (
                    <span>Character limit is 500</span>
                  )}
                  <input
                    type="text"
                    placeholder="Write a comment"
                    {...register("text", { required: true, maxLength: 500 })}
                  />
                  <input type="submit" />
                </form>
              </section>
              {!comments.length ? (
                <p>no comments</p>
              ) : (
                <ul>
                  {comments.map((comment) =>
                    !comment.isDeleted ? (
                      <Comment
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
