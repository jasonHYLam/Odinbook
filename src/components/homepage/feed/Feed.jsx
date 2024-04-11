import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useOutletContext } from "react-router-dom";
import { PostPreview } from "../postPreview/PostPreview";

export function Feed() {
  const { loggedInUser, feed } = useOutletContext();
  return (
    <>
      <p>It's me the feed</p>
      <main>
        <section>
          <ul>
            {feed.map((post) => (
              <PostPreview post={post} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
