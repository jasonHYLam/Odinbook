import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";

export function Feed() {
  useState();
  useEffect(() => {
    async function fetchFeedAndUsersData() {
      const [] = await Promise.all([
        // fetchData("/post/"),
      ]);
    }
  });
  return (
    <>
      <p>It's me the feed</p>
    </>
  );
}
