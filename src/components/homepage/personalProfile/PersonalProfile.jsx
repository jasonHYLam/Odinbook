import styles from "./PersonalProfile.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { fetchData } from "../../../helper/helperUtils";
import { EditProfileModal } from "./modals/EditProfileModal";
import { FollowersModal } from "./modals/FollowersModal";
import { FollowingModal } from "./modals/FollowingModal";
import { LogoutModal } from "./modals/LogoutModal";
import { PostPreview } from "../postPreview/PostPreview";
import { PostsContainer } from "../postsContainer/PostsContainer";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import { Loading } from "../../loading/Loading";

export function PersonalProfile() {
  const navigate = useNavigate();
  const { loggedInUser, likedPosts, bookmarkedPosts } = useOutletContext();
  const [userPosts, setUserPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [selectedPosts, setSelectedPosts] = useState();

  useEffect(() => {
    async function getUserPosts() {
      const [getUserPostsResponse] = await Promise.all([
        await fetchData("user/view_personal_profile", "GET"),
      ]);

      if (getUserPostsResponse.status === 401) {
        navigate("/login");
      } else if (
        !getUserPostsResponse.ok ||
        getUserPostsResponse instanceof Error
      ) {
        navigate("/error");
      } else {
        const { posts } = await getUserPostsResponse.json();
        setUserPosts(posts);
        setIsLoading(false);
      }
    }
    getUserPosts();
  }, [navigate]);
  return (
    <main>
      <ProfilePic URL={loggedInUser.profilePicURL} size="large" />
      <h2>{loggedInUser.username}</h2>
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <nav className={styles.navOptions}>
              <span onClick={() => setShowSettings(true)}>Settings</span>
              <span onClick={() => setShowFollowers(true)}>Followers</span>
              <span onClick={() => setShowFollowing(true)}>Following</span>
              <span onClick={() => setShowLogout(true)}>Logout</span>
            </nav>

            <nav className={styles.navOptions}>
              <span onClick={() => setPostsToShow("user")}>Your Posts</span>
              <span onClick={() => setPostsToShow("liked")}>Liked</span>
              <span onClick={() => setPostsToShow("bookmarked")}>
                Bookmarked
              </span>
            </nav>

            <PostsContainer
              posts={
                postsToShow === "user"
                  ? userPosts
                  : postsToShow === "liked"
                  ? likedPosts
                  : postsToShow === "bookmarked"
                  ? bookmarkedPosts
                  : null
              }
            />

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
