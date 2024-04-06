import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";

export function PersonalProfile() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("checking posts");
  console.log(posts);

  useEffect(() => {
    async function getUserPosts() {
      const getPostsResponse = await fetchData(
        "user/view_personal_profile",
        "GET"
      );
      if (!getPostsResponse.ok || getPostsResponse instanceof Error) {
        navigate("/error");
      } else {
        const { posts } = await getPostsResponse.json();
        setPosts(posts);
        setIsLoading(false);
      }
    }
    getUserPosts();
  }, []);
  return (
    <main>
      <p>it's me personalProfile</p>
      <h2>{user.username}</h2>
      <section>
        <p>Your Posts</p>
        {isLoading ? (
          <p>loading</p>
        ) : (
          <ul>
            {posts.map((post) => {
              return (
                <>
                  <p>post.text;</p>
                </>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
