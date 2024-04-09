import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";
import { SettingsModal } from "./modals/SettingsModal";
import { FollowersModal } from "./modals/FollowersModal";

export function PersonalProfile() {
  const navigate = useNavigate();
  const { loggedInUser } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  console.log("checking showSettings");
  console.log(showSettings);

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
        {isLoading ? (
          <p>loading</p>
        ) : (
          <>
            <nav>
              <span onClick={() => setShowSettings(true)}>settings</span>
              <span onClick={() => setShowFollowers(true)}>followers</span>
              <span onClick={() => setShowSettings(true)}>following</span>
              <span onClick={() => setShowSettings(true)}>logout</span>
            </nav>

            <p>Your Posts</p>
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

            <SettingsModal
              openModal={showSettings}
              closeModal={() => setShowSettings(false)}
            />

            <FollowersModal
              followers={loggedInUser.followers}
              openModal={showFollowers}
              closeModal={() => setShowFollowers(false)}
            />
          </>
        )}
      </section>
    </main>
  );
}
