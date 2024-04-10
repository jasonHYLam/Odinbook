import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchData } from "../../../helper/helperUtils";

export function Comment({ comment, postID }) {
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
    console.log("dataToSubmit");
    console.log(dataToSubmit);
    // const editResponse = await fetchData(
    //   `comment/${postID}/${comment._id}/edit`,
    //   "PUT"
    // );

    setStatus("");
  }

  const editForm = (
    <form onSubmit={handleSubmit(submitEdit)}>
      <button onClick={() => setStatus("")}>cancel</button>
      <input
        type="text"
        value={comment.text}
        {...register("text", {
          required: true,
          maxLength: 500,
        })}
      />
      <input type="submit" value="Edit" />
    </form>
  );

  return (
    <>
      <article>
        <Link to={authorURL}>
          <img src={comment.author.profilePicURL} alt="" />
          <span>{comment.author.username}</span>
        </Link>

        {status === "" ? (
          <>
            <p>{comment.text}</p>
            <p>{comment.dateCommented}</p>

            {comment.author.id === loggedInUser.id ? (
              <>
                <button onClick={() => setStatus("edit")}>edit</button>
                <button onClick={() => setStatus("delete")}>delete</button>
              </>
            ) : null}
          </>
        ) : status === "edit" ? (
          editForm
        ) : null}
      </article>
    </>
  );
}
