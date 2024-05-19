import styles from "./Comment.module.css";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchData } from "../../../../helper/helperUtils";
import { ProfilePic } from "../../icons/profilePic/ProfilePic";

import { CommentType, UserType } from "../../../../helper/types";

interface CommentProps {
  comment: CommentType;
  postID: string;
  setComments: (comments: CommentType[]) => void;
  allPostComments: CommentType[];
}

interface LoggedInUserType {
  loggedInUser: UserType;
}

interface EditFormValues {
  text: string;
}

export function Comment({
  comment,
  postID,
  setComments,
  allPostComments,
}: CommentProps) {
  const navigate = useNavigate();
  const { loggedInUser }: LoggedInUserType = useOutletContext();
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormValues>();

  const authorURL =
    comment.author.id === loggedInUser.id
      ? "/me"
      : `/users/${comment.author.id}`;

  // async function submitEdit(data: { text: string }) {

  // might need to make a interface for FormValues
  const submitEdit = async (data: EditFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const dataToSubmit = JSON.stringify(data);
    const editResponse = await fetchData(
      `comment/${postID}/${comment._id}/edit`,
      "PUT",
      dataToSubmit
    );
    if (!editResponse.ok || editResponse instanceof Error) {
      navigate("/error");
    } else {
      const { editedComment } = await editResponse.json();

      const updatedComments = allPostComments.map((comment) => {
        if (comment._id === editedComment._id) return editedComment;
        return comment;
      });

      setComments(updatedComments);

      setStatus("");
    }
  };

  async function deleteComment() {
    const deleteResponse = await fetchData(
      `comment/${postID}/${comment._id}/delete`,
      "DELETE"
    );

    if (!deleteResponse.ok || deleteResponse instanceof Error) {
      navigate("/error");
    } else {
      const updatedComments = allPostComments.filter((postComment) => {
        if (postComment._id !== comment._id) return postComment;
      });

      setComments(updatedComments);

      setStatus("");
    }
  }

  const editForm = (
    <form onSubmit={handleSubmit(submitEdit)}>
      <button onClick={() => setStatus("")}>cancel</button>
      <input
        type="text"
        {...register("text", {
          required: true,
          maxLength: 500,
        })}
      />
      <input type="submit" value="Edit" />
    </form>
  );

  const deleteForm = (
    <section>
      <p>Are you sure you want to delete?</p>
      <button onClick={deleteComment}>Delete</button>
      <button onClick={() => setStatus("")}>Cancel</button>
    </section>
  );

  return (
    <>
      <article className={styles.comment}>
        <Link to={authorURL} className={styles.profileInfo}>
          <ProfilePic URL={comment.author.profilePicURL} component="comment" />
          <span>{comment.author.username}</span>
          <span className={styles.date}>
            {comment.dateCommentedFormatted.toString()}
          </span>
        </Link>

        {status === "" ? (
          <>
            <p className={styles.text}>{comment.text}</p>

            {comment.author.id === loggedInUser.id ? (
              <>
                <button onClick={() => setStatus("edit")}>edit</button>
                <button onClick={() => setStatus("delete")}>delete</button>
              </>
            ) : null}
          </>
        ) : status === "edit" ? (
          editForm
        ) : status === "delete" ? (
          deleteForm
        ) : null}
      </article>
    </>
  );
}
