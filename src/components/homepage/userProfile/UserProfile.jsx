import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useParams } from "react-router-dom";
import { PostPreview } from "../postPreview/PostPreview";
import { ProfilePic } from "../icons/profilePic/ProfilePic";
import { Loading } from "../../loading/Loading";

export function UserProfile() {
  const navigate = useNavigate();
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoggedInUserFollowing, setIsLoggedInUserFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowingPending, setIsFollowingPending] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      const getUserResponse = await fetchData(`user/${userID}/profile`);

      if (getUserResponse.status === 401) {
        navigate("/login");
      } else if (!getUserResponse.ok || getUserResponse instanceof Error) {
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

  async function followUser(userID) {
    if (isFollowingPending) return;
    setIsFollowingPending(true);
    const followResponse = await fetchData(`user/${userID}/follow`, "POST");
    if (!followResponse.ok || followResponse instanceof Error) {
      navigate("/error");
    } else {
      setIsLoggedInUserFollowing(true);
      setIsFollowingPending(false);
      return;
    }
  }

  async function unfollowUser(userID) {
    if (isFollowingPending) return;
    setIsFollowingPending(true);
    const followResponse = await fetchData(`user/${userID}/unfollow`, "POST");
    if (!followResponse.ok || followResponse instanceof Error) {
      navigate("/error");
    } else {
      setIsLoggedInUserFollowing(false);
      setIsFollowingPending(false);
      return;
    }
  }

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <section>
            <ProfilePic URL={user.profilePicURL} size="large" />
            <h2>{user.username}</h2>
            {isLoggedInUserFollowing ? (
              <button
                onClick={() => {
                  unfollowUser(user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  followUser(user.id);
                }}
              >
                Follow
              </button>
            )}
          </section>
          <section>
            <p>Posts</p>
            <ul>
              {posts.map((post) => (
                <PostPreview key={post.id} post={post} />
              ))}
            </ul>
          </section>
        </section>
      )}
    </main>
  );
}
