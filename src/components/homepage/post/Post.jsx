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
// import { CommentSection } from "./CommentSection";
import { IconsContainer } from "./subComponents/IconsContainer";
import { CommentSection } from "./subComponents/CommentSection";
import { Comment } from "./subComponents/Comment";
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
  const [isSubmittingLike, setIsSubmittingLike] = useState(false);
  const [isSubmittingUnlike, setIsSubmittingUnlike] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [isSubmittingBookmark, setIsSubmittingBookmark] = useState(false);

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

  // async function likePost() {
  //   if (isSubmittingLike) return;
  //   setIsSubmittingLike(true);
  //   const likePostResponse = await fetchData(`post/${postID}/like`, "PUT");
  //   if (!likePostResponse.ok || likePostResponse instanceof Error) {
  //     navigate("/error");
  //   } else {
  //     const { likedPost } = await likePostResponse.json();
  //     setLikesCount(likesCount + 1);
  //     setIsLiked(true);
  //     setIsSubmittingLike(false);
  //     setLikedPosts([...likedPosts, likedPost]);
  //   }
  // }

  // async function unlikePost() {
  //   if (isSubmittingUnlike) return;
  //   setIsSubmittingUnlike(true);
  //   const unlikePostResponse = await fetchData(`post/${postID}/unlike`, "PUT");
  //   if (!unlikePostResponse.ok || unlikePostResponse instanceof Error) {
  //     navigate("/error");
  //   } else {
  //     const { unlikedPost } = await unlikePostResponse.json();
  //     setLikesCount(likesCount - 1);
  //     setIsLiked(false);
  //     setIsSubmittingUnlike(false);

  //     const updatedLikedPosts = likedPosts.filter(
  //       (post) => post._id !== unlikedPost._id
  //     );

  //     setLikedPosts(updatedLikedPosts);
  //   }
  // }

  // async function toggleBookmarkPost() {
  //   if (isSubmittingBookmark) return;
  //   setIsSubmittingBookmark(true);

  //   if (isBookmarked) {
  //     setIsBookmarked(false);
  //     setBookmarksCount(bookmarksCount - 1);
  //   } else {
  //     setIsBookmarked(true);
  //     setBookmarksCount(bookmarksCount + 1);
  //   }

  //   const response = await fetchData(`post/${postID}/toggle_bookmark`, "PUT");

  //   if (!response.ok || response instanceof Error) {
  //     navigate("/error");
  //   } else {
  //     const { matchingPost } = await response.json();
  //     if (isBookmarked) {
  //       const updatedBookmarkedPosts = bookmarkedPosts.filter(
  //         (post) => post._id !== matchingPost._id
  //       );
  //       setBookmarkedPosts(updatedBookmarkedPosts);
  //     } else {
  //       setBookmarkedPosts([...bookmarkedPosts, matchingPost]);
  //     }
  //     setIsSubmittingBookmark(false);
  //   }
  // }

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

              {/* <section className={styles.iconContainer}>
                <div onClick={() => (isLiked ? unlikePost() : likePost())}>
                  <LikeIcon isLiked={isLiked} />
                  <span className={styles.likesCount}>{likesCount}</span>
                </div>
                <div onClick={toggleBookmarkPost}>
                  <Bookmark isBookmarked={isBookmarked} />
                  <span className={styles.likesCount}>{bookmarksCount}</span>
                </div>
              </section> */}
              {/* <IconsContainer postID={postID} isLiked={isLiked} setIsLiked={setIsLiked} isS /> */}
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
