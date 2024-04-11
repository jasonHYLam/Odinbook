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

  console.log("checking");
  console.log(loggedInUser);
  console.log(post);
  let CREATOR_PROFILE_URL = "";
  if (!isLoading) {
    CREATOR_PROFILE_URL =
      loggedInUser._id === post.creator._id
        ? "/me"
        : `/users/${post.creator._id}`;
  }

  console.log("post");
  console.log(post);

  useEffect(() => {
    async function fetchPostAndComments() {
      const getResponse = await fetchData(`post/${postID}`, "GET");
      if (!getResponse.ok || getResponse instanceof Error) {
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
    const likePostResponse = await fetchData(`post/${postID}/like`, "PUT");
    if (!likePostResponse.ok || likePostResponse instanceof Error) {
      navigate("/error");
    } else {
      const { likedPost } = await likePostResponse.json();
      setLikesCount(likesCount + 1);
      setIsLiked(true);

      setLikedPosts([...likedPosts, likedPost]);
    }
  }

  async function unlikePost() {
    const unlikePostResponse = await fetchData(`post/${postID}/unlike`, "PUT");
    if (!unlikePostResponse.ok || unlikePostResponse instanceof Error) {
      navigate("/error");
    } else {
      const { unlikedPost } = await unlikePostResponse.json();
      setLikesCount(likesCount - 1);
      setIsLiked(false);

      const updatedLikedPosts = likedPosts.filter(
        (post) => post._id !== unlikedPost._id
      );

      setLikedPosts(updatedLikedPosts);
    }
  }

  async function postComment(data) {
    console.log("does this happen");
    const dataToSubmit = JSON.stringify(data);
    console.log(dataToSubmit);
    const commentResponse = await fetchData(
      `comment/${postID}/comment`,
      "POST",
      dataToSubmit
    );
    console.log("check call ");
    if (!commentResponse.ok || commentResponse instanceof Error) {
      navigate("/error");
    } else {
      const { newComment } = await commentResponse.json();
      reset();
      console.log("check newComment");
      console.log(newComment);
      setComments([...comments, newComment]);
    }
  }

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <>
          <main>
            <section>
              <Link to={CREATOR_PROFILE_URL}>
                <ProfilePic URL={post.creator.profilePicURL} component="post" />
                <span>{post.creator.username}</span>
                <span className={styles.date}>{post.datePosted}</span>
              </Link>

              {post.imageURL ? <img src={post.imageURL} alt="" /> : null}

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
