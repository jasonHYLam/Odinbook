import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useOutletContext } from "react-router-dom";

export function Feed() {
  const { user, feed } = useOutletContext();
  console.log("checking Feed component");
  console.log(user);
  console.log(feed);
  return (
    <>
      <p>It's me the feed</p>
    </>
  );
}
