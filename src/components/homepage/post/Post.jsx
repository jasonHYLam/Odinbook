import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useParams } from "react-router-dom";

export function Post() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  console.log("checking isLiked");
  console.log(isLiked);

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
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    }
  }

  async function unlikePost() {
    const likePostResponse = await fetchData(`post/${postID}/unlike`, "PUT");
    if (!likePostResponse.ok || likePostResponse instanceof Error) {
      navigate("/error");
    } else {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
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
                {isLiked ? (
                  <span onClick={unlikePost}>unlike post</span>
                ) : (
                  <span onClick={likePost}>like post</span>
                )}
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
