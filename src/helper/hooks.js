import { useEffect, useState } from "react";
import { fetchData } from "./helperUtils";
import { useNavigate } from "react-router-dom";

export function useMobileView() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function changeWidth() {
      setIsMobileView(window.innerWidth < 400);
    }
    changeWidth();

    window.addEventListener("resize", changeWidth);
    return window.removeEventListener("resize", changeWidth);
  }, []);
  return { isMobileView };
}

export function useTags() {
  const navigate = useNavigate();
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    async function getTags() {
      const getTagsResponse = await fetchData("post/all_tags", "GET");
      if (!getTagsResponse.ok || getTagsResponse instanceof Error) {
        navigate("/error");
      } else {
        const { allTags } = await getTagsResponse.json();
        console.log(`allTags`);
        console.log(allTags);
        setAllTags(allTags);
      }
    }

    getTags();
  }, [navigate]);
  return { allTags };
}
