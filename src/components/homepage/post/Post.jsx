import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useParams } from "react-router-dom";

export function Post() {
  const { postID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <p>it's me a post</p>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <>
          <main>
            <section>
              <p>{post.text}</p>
            </section>
          </main>
        </>
      )}
    </>
  );
}
