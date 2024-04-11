import styles from "./PersonalProfile.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";
import { EditProfileModal } from "./modals/EditProfileModal";
import { FollowersModal } from "./modals/FollowersModal";
import { FollowingModal } from "./modals/FollowingModal";
import { LogoutModal } from "./modals/LogoutModal";
import { PostPreview } from "../postPreview/PostPreview";
import { ProfilePic } from "../icons/profilePic/ProfilePic";

export function PersonalProfile() {
  const navigate = useNavigate();
  const { loggedInUser, likedPosts } = useOutletContext();
  const [userPosts, setUserPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    async function getUserPosts() {
      const [getUserPostsResponse] = await Promise.all([
        await fetchData("user/view_personal_profile", "GET"),
      ]);

      if (!getUserPostsResponse.ok || getUserPostsResponse instanceof Error) {
        navigate("/error");
      } else {
        const { posts } = await getUserPostsResponse.json();
        setUserPosts(posts);
        setIsLoading(false);
      }
    }
    getUserPosts();
  }, []);
  return (
    <main>
      <ProfilePic URL={loggedInUser.profilePicURL} size="large" />
      <h2>{loggedInUser.username}</h2>
      <section>
        {isLoading ? (
          <p>loading</p>
        ) : (
          <>
            <nav className={styles.navOptions}>
              <span onClick={() => setShowSettings(true)}>settings</span>
              <span onClick={() => setShowFollowers(true)}>followers</span>
              <span onClick={() => setShowFollowing(true)}>following</span>
              <span onClick={() => setShowLogout(true)}>logout</span>
            </nav>

            <nav className={styles.navOptions}>
              <span onClick={() => setPostsToShow("user")}>Your Posts</span>
              <span onClick={() => setPostsToShow("liked")}>Liked Posts</span>
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

            <EditProfileModal
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
