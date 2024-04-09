import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";

export function PersonalProfile() {
  const navigate = useNavigate();
  const { loggedInUser } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(users);
  // console.log("checking posts");
  // console.log(posts);

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
      <h2>{loggedInUser.username}</h2>
      <section>
        <p>Your Posts</p>
        {isLoading ? (
          <p>loading</p>
        ) : (
          <ul>
            {posts.map((post) => {
              return (
                <>
                  <Link to={`/posts/${post.id}`}>
                    <p>{post.creator.username}</p>
                    <p>{post.text}</p>
                  </Link>
                </>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <p>Followers</p>
        {loggedInUser.followers.map((user) => {
          return (
            <article>
              <p>{user.username}</p>
            </article>
          );
        })}

        <p>Following</p>
        {loggedInUser.following.map((user) => {
          return (
            <Link to={`/users/${user.id}`}>
              <article>
                <p>{user.username}</p>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
