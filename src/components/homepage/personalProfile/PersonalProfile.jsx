import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";
import { SettingsModal } from "./modals/SettingsModal";
import { FollowersModal } from "./modals/FollowersModal";
import { FollowingModal } from "./modals/FollowingModal";
import { LogoutModal } from "./modals/LogoutModal";
import { PostPreview } from "../postPreview/PostPreview";

export function PersonalProfile() {
  const navigate = useNavigate();
  const { loggedInUser } = useOutletContext();
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

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
              <p onClick={() => setPostsToShow("user")}>Your Posts</p>
              <p onClick={() => setPostsToShow("liked")}>Liked Posts</p>
            </nav>

            {postsToShow === "user" ? (
              <>
                <ul>
                  {userPosts.map((post) => (
                    <PostPreview post={post} />
                  ))}
                </ul>
              </>
            ) : (
              <>
                <ul>
                  {likedPosts.map((post) => (
                    <PostPreview post={post} />
                  ))}
                </ul>
              </>
            )}

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
