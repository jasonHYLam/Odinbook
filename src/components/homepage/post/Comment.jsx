import styles from "./Comment.module.css";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchData } from "../../../helper/helperUtils";
import { ProfilePic } from "../profilePic/ProfilePic";

export function Comment({ comment, postID, setComments, allPostComments }) {
  const navigate = useNavigate();
  const { loggedInUser } = useOutletContext();
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const authorURL =
    comment.author.id === loggedInUser.id
      ? "/me"
      : `/users/${comment.author.id}`;

  async function submitEdit(data) {
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
  }

  async function deleteComment() {
    const deleteResponse = fetchData(
      `comment/${postID}/${comment._id}/delete`,
      "DELETE"
    );
    if (!deleteResponse.ok || deleteResponse instanceof Error) {
      navigate("/error");
    } else {
      const { deletedComment } = deleteResponse.json();

      const updatedComments = allPostComments.map((comment) => {
        if (comment._id === deletedComment._id) return deletedComment;
        return comment;
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
    <form>
      <p>Are you sure you want to delete?</p>
      <button onClick={deleteComment}>Delete</button>
      <button onClick={() => setStatus("")}>Cancel</button>
    </form>
  );

  return (
    <>
      <article>
        <Link to={authorURL}>
          <ProfilePic URL={comment.author.profilePicURL} component="comment" />
          <span>{comment.author.username}</span>
          <span>{comment.dateCommented}</span>
        </Link>

        {status === "" ? (
          <>
            <p>{comment.text}</p>

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
