import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";
import { SettingsModal } from "./modals/SettingsModal";
import { FollowersModal } from "./modals/FollowersModal";
import { FollowingModal } from "./modals/FollowingModal";
import { LogoutModal } from "./modals/LogoutModal";

export function PersonalProfile() {
  const navigate = useNavigate();
  const { loggedInUser } = useOutletContext();
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  console.log("checking showSettings");
  console.log(showSettings);

  useEffect(() => {
    async function getUserPosts() {
      const [getUserPostsResponse, getLikedPostsResponse] = await Promise.all([
        await fetchData("user/view_personal_profile", "GET"),
        await fetchData("post/liked_posts", "GET"),
      ]);

      if (
        !getUserPostsResponse.ok ||
        getUserPostsResponse instanceof Error ||
        !getLikedPostsResponse.ok ||
        getLikedPostsResponse instanceof Error
      ) {
        navigate("/error");
      } else {
        const { posts } = await getUserPostsResponse.json();
        const { likedPosts } = await getLikedPostsResponse.json();
        setUserPosts(posts);
        setLikedPosts(likedPosts);
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
              <span onClick={() => setShowFollowing(true)}>following</span>
              <span onClick={() => setShowLogout(true)}>logout</span>
            </nav>

            <nav>
              <p>Your Posts</p>
              <p>Liked Posts</p>
            </nav>

            <ul>
              {userPosts.map((post) => {
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

            <SettingsModal
              openModal={showSettings}
              closeModal={() => setShowSettings(false)}
            />

            <FollowersModal
              followers={loggedInUser.followers}
              openModal={showFollowers}
              closeModal={() => setShowFollowers(false)}
            />

            <FollowingModal
              following={loggedInUser.following}
              openModal={showFollowing}
              closeModal={() => setShowFollowing(false)}
            />

            <LogoutModal
              openModal={showLogout}
              closeModal={() => setShowLogout(false)}
            />
          </>
        )}
      </section>
    </main>
  );
}
