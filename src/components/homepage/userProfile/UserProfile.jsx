import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useParams } from "react-router-dom";

export function UserProfile() {
  const navigate = useNavigate();
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoggedInUserFollowing, setIsLoggedInUserFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("checking user");
  console.log(user);

  useEffect(() => {
    async function fetchUserData() {
      const getUserResponse = await fetchData(`user/${userID}/profile`);
      if (!getUserResponse.ok || getUserResponse instanceof Error) {
        navigate("/error");
      } else {
        const { user, posts, isLoggedInUserFollowing } =
          await getUserResponse.json();

        setUser(user);
        setPosts(posts);
        setIsLoggedInUserFollowing(isLoggedInUserFollowing);

        setIsLoading(false);
      }
    }
    fetchUserData();
  }, []);
  return (
    <main>
      <p>it's me userProfile</p>

      {isLoading ? (
        <p>loading</p>
      ) : (
        <section>
          <section>
            {/* profilePic */}
            <p>{user.username}</p>
          </section>
          <section>
            <ul>
              {posts.map((post) => {
                return (
                  <article>
                    <p>{post.text}</p>
                  </article>
                );
              })}
            </ul>
          </section>
        </section>
      )}
    </main>
  );
}
