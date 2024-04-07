import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useParams } from "react-router-dom";

export function Post() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
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
        setLikesCount(post.likesCount);
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
      setLikesCount(likesCount + 1);
    }
  }

  async function unlikePost() {
    const likePostResponse = await fetchData(`post/${postID}/like`, "PUT");
    if (!likePostResponse.ok || likePostResponse instanceof Error) {
      navigate("/error");
    } else {
      setLikesCount(likesCount - 1);
    }
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
              <p>{likesCount}</p>

              <section>
                <span onClick={likePost}>like post</span>
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
