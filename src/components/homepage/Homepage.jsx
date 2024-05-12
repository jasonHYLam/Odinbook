import { fetchData } from "../../helper/helperUtils";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./header/Header";
import { useEffect, useState } from "react";
import { Loading } from "../loading/Loading";

export function Homepage() {
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isGuest, setIsGuest] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);

  function resetSearchQuery() {
    setSearchQuery("");
  }

  useEffect(() => {
    async function fetchFeedAndUsersData() {
      const [
        getUserPostsResponse,
        getLoggedInUserResponse,
        getLikedPostsResponse,
        getBookmarkedPostsResponse,
      ] = await Promise.all([
        fetchData("post/all_posts", "GET"),
        fetchData("user/get_logged_in_user", "GET"),
        fetchData("post/liked_posts", "GET"),
        fetchData("post/bookmarked_posts", "GET"),
      ]);

      if (
        getLikedPostsResponse.status === 401 ||
        getLoggedInUserResponse.status === 401 ||
        getLikedPostsResponse === 401 ||
        getBookmarkedPostsResponse === 401
      ) {
        navigate("/login");
      } else if (
        !getUserPostsResponse.ok ||
        !getLoggedInUserResponse.ok ||
        !getLikedPostsResponse.ok ||
        getUserPostsResponse instanceof Error ||
        getLoggedInUserResponse instanceof Error ||
        getLikedPostsResponse instanceof Error ||
        getBookmarkedPostsResponse instanceof Error
      ) {
        navigate("/error");
      } else {
        const { allPosts } = await getUserPostsResponse.json();
        const { user } = await getLoggedInUserResponse.json();
        const { likedPosts } = await getLikedPostsResponse.json();
        const { bookmarkedPosts } = await getBookmarkedPostsResponse.json();

        setFeed(allPosts);
        setLoggedInUser(user);
        setLikedPosts(likedPosts);
        setBookmarkedPosts(bookmarkedPosts);
        if (user.isGuest) setIsGuest(true);

        setIsLoading(false);
      }
    }

    fetchFeedAndUsersData();
  }, [navigate]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            user={loggedInUser}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setMatchingUsers={setMatchingUsers}
          />

          <Outlet
            context={{
              loggedInUser,
              setLoggedInUser,
              feed,
              setFeed,
              likedPosts,
              setLikedPosts,
              isGuest,
              searchQuery,
              setSearchQuery,
              matchingUsers,
              setMatchingUsers,
              resetSearchQuery,
              bookmarkedPosts,
              setBookmarkedPosts,
            }}
          />
        </>
      )}
    </>
  );
}
