import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useParams } from "react-router-dom";

export function Post() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(post);

  useEffect(() => {
    async function fetchPostAndComments() {
      const getResponse = await fetchData(`post/${postID}`, "GET");
      if (!getResponse.ok || getResponse instanceof Error) {
        navigate("/error");
      } else {
        const { post, comments } = await getResponse.json();
        setPost(post);
        setComments(comments);
        setIsLoading(false);
      }
    }

    fetchPostAndComments();
  }, []);

  async function likePost() {
    const likePostResponse = await fetchData(`post/${postID}/like`, "PUT");
  }

  return (
    <>
      <p>it's me a post</p>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <>
          <main>
            <section>
              <p>{post.creator.username}</p>
              <p>{post.text}</p>
              <p>{post.likesCount}</p>

              <section>
                <span>like post</span>
              </section>
            </section>

            <section>
              <section>
                <form>
                  <input type="text" placeholder="Write a comment" />
                  <input type="submit" />
                </form>
              </section>
              {!comments.length ? (
                <p>no comments</p>
              ) : (
                <ul>
                  {comments.map((comment) => {
                    return <>{comment.text}</>;
                  })}
                </ul>
              )}
            </section>
          </main>
        </>
      )}
    </>
  );
}
