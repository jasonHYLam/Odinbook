import { fetchData } from "../../helper/helperUtils";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";

export function Homepage() {
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log("checking state");
  console.log(feed);
  console.log(user);
  useEffect(() => {
    async function fetchFeedAndUsersData() {
      const [allPostsResponse, getLoggedInUserResponse] = await Promise.all([
        fetchData("post/all_posts", "GET"),
        fetchData("user/get_logged_in_user", "GET"),
      ]);

      if (
        !allPostsResponse.ok ||
        !getLoggedInUserResponse ||
        allPostsResponse instanceof Error ||
        getLoggedInUserResponse instanceof Error
      ) {
        navigate("/error");
      } else {
        const { allPosts } = await allPostsResponse.json();
        const { user } = await getLoggedInUserResponse.json();

        setFeed(allPosts);
        setUser(user);
        setIsLoading(false);
      }
    }

    fetchFeedAndUsersData();
  }, []);
  return (
    <>
      <Header user={user} />
      <main>
        <p>its me homepage</p>

        <Outlet context={user} />
      </main>
    </>
  );
}
