import { Bookmark } from "../../icons/bookmark/Bookmark";
import { LikeIcon } from "../../icons/like/LikeIcon";
import styles from "./iconsContainer.module.css";

import { fetchData } from "../../../../helper/helperUtils";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

export function IconsContainer({
  postID,

  isLiked,
  setIsLiked,
  likesCount,
  setLikesCount,

  isBookmarked,
  setIsBookmarked,
  bookmarksCount,
  setBookmarksCount,
}) {
  const [isSubmittingIconUpdate, setIsSubmittingIconUpdate] = useState(false);
  const { likedPosts, setLikedPosts, bookmarkedPosts, setBookmarkedPosts } =
    useOutletContext();

  const navigate = useNavigate();

  async function likePost() {
    if (isSubmittingIconUpdate) return;
    setIsSubmittingIconUpdate(true);
    const likePostResponse = await fetchData(`post/${postID}/like`, "PUT");
    if (!likePostResponse.ok || likePostResponse instanceof Error) {
      navigate("/error");
    } else {
      const { likedPost } = await likePostResponse.json();
      setLikesCount(likesCount + 1);
      setIsLiked(true);
      setIsSubmittingIconUpdate(false);
      setLikedPosts([...likedPosts, likedPost]);
    }
  }

  async function unlikePost() {
    if (isSubmittingIconUpdate) return;
    setIsSubmittingIconUpdate(true);
    const unlikePostResponse = await fetchData(`post/${postID}/unlike`, "PUT");
    if (!unlikePostResponse.ok || unlikePostResponse instanceof Error) {
      navigate("/error");
    } else {
      const { unlikedPost } = await unlikePostResponse.json();
      setLikesCount(likesCount - 1);
      setIsLiked(false);
      setIsSubmittingIconUpdate(false);

      const updatedLikedPosts = likedPosts.filter(
        (post) => post._id !== unlikedPost._id
      );

      setLikedPosts(updatedLikedPosts);
    }
  }

  async function toggleBookmarkPost() {
    if (isSubmittingIconUpdate) return;
    setIsSubmittingIconUpdate(true);

    if (isBookmarked) {
      setIsBookmarked(false);
      setBookmarksCount(bookmarksCount - 1);
    } else {
      setIsBookmarked(true);
      setBookmarksCount(bookmarksCount + 1);
    }

    const response = await fetchData(`post/${postID}/toggle_bookmark`, "PUT");

    if (!response.ok || response instanceof Error) {
      navigate("/error");
    } else {
      const { matchingPost } = await response.json();
      if (isBookmarked) {
        const updatedBookmarkedPosts = bookmarkedPosts.filter(
          (post) => post._id !== matchingPost._id
        );
        setBookmarkedPosts(updatedBookmarkedPosts);
      } else {
        setBookmarkedPosts([...bookmarkedPosts, matchingPost]);
      }
      setIsSubmittingIconUpdate(false);
    }
  }
  return (
    <>
      <section className={styles.iconsContainer}>
        <div onClick={() => (isLiked ? unlikePost() : likePost())}>
          <LikeIcon isLiked={isLiked} />
          <span className={styles.likesCount}>{likesCount}</span>
        </div>
        <div onClick={toggleBookmarkPost}>
          <Bookmark isBookmarked={isBookmarked} />
          <span className={styles.likesCount}>{bookmarksCount}</span>
        </div>
      </section>
    </>
  );
}
