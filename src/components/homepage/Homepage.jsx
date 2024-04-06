import { fetchData } from "../../helper/helperUtils";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";

export function Homepage() {
  useState();
  useEffect(() => {
    async function fetchFeedAndUsersData() {
      const [allPostsResponse, getLoggedInUserResponse] = await Promise.all([
        fetchData("post/all_posts", "GET"),
        fetchData("user/get_logged_in_user", "GET"),
      ]);

      const { allPosts } = await allPostsResponse.json();
      const { user } = await getLoggedInUserResponse.json();

      // console.log("checking allPosts");
      // console.log(allPosts);

      console.log("checking user");
      console.log(user);
    }

    fetchFeedAndUsersData();
  });
  return (
    <>
      <Header />
      <main>
        <p>its me homepage</p>
        <Outlet />
      </main>
    </>
  );
}
