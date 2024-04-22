import { useEffect, useState } from "react";

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
