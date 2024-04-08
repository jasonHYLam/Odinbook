import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useOutletContext } from "react-router-dom";

export function Feed() {
  const { loggedInUser, feed } = useOutletContext();
  console.log("checking Feed component");
  console.log(loggedInUser);
  console.log(feed);
  return (
    <>
      <p>It's me the feed</p>
    </>
  );
}
