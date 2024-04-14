import { fetchData } from "../../helper/helperUtils";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";

export function Homepage() {
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isGuest, setIsGuest] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedAndUsersData() {
      const [
        getUserPostsResponse,
        getLoggedInUserResponse,
        getLikedPostsResponse,
      ] = await Promise.all([
        fetchData("post/all_posts", "GET"),
        fetchData("user/get_logged_in_user", "GET"),
        fetchData("post/liked_posts", "GET"),
      ]);

      if (
        getLikedPostsResponse.status === 401 ||
        getLoggedInUserResponse.status === 401 ||
        getLikedPostsResponse === 401
      ) {
        console.log("this happens");
        navigate("/login");
      } else if (
        !getUserPostsResponse.ok ||
        !getLoggedInUserResponse.ok ||
        !getLikedPostsResponse.ok ||
        getUserPostsResponse instanceof Error ||
        getLoggedInUserResponse instanceof Error ||
        getLikedPostsResponse instanceof Error
      ) {
        navigate("/error");
      } else {
        const { allPosts } = await getUserPostsResponse.json();
        const { user } = await getLoggedInUserResponse.json();
        const { likedPosts } = await getLikedPostsResponse.json();

        setFeed(allPosts);
        setLoggedInUser(user);
        setLikedPosts(likedPosts);
        if (user.isGuest) setIsGuest(true);

        setIsLoading(false);
      }
    }

    fetchFeedAndUsersData();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <>
          <Header user={loggedInUser} />

          <Outlet
            context={{
              loggedInUser,
              setLoggedInUser,
              feed,
              setFeed,
              likedPosts,
              setLikedPosts,
              isGuest,
            }}
          />
        </>
      )}
    </>
  );
}
