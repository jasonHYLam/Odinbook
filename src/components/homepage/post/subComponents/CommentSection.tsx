import styles from "./Comment.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchData } from "../../../../helper/helperUtils";
import { useNavigate } from "react-router-dom";
import { Comment } from "./Comment";

import { CommentType } from "../../../../helper/types";

interface CommentSectionProps {
  postID: string;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
}

interface CommentFormValues {
  text: string;
}

export function CommentSection({
  postID,
  comments,
  setComments,
}: CommentSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<CommentFormValues>();

  const navigate = useNavigate();

  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const CHAR_LIMIT = 100;
  const remainingChars = CHAR_LIMIT - commentText.length;
  function exceededCharLimit() {
    return CHAR_LIMIT - commentText.length < 0;
  }

  async function postComment(data: CommentFormValues) {
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
      reset({ text: "" });
      setComments([...comments, newComment]);
      setIsSubmittingComment(false);
    }
  }

  return (
    <>
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
                  if (commentText.length > 0 || commentText.length < 100)
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
                  postID={postID}
                  setComments={setComments}
                  allPostComments={comments}
                />
              ) : null
            )}
          </ul>
        )}
      </section>
    </>
  );
}
