import { useState, useEffect } from "react";

export const useWindowSize = (breakPoint) => {
  const [isSmaller, setIsSmaller] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakPoint : false
  );
  useEffect(() => {
    function screenResized() {
      if (isSmaller && window.innerWidth > breakPoint) {
        setIsSmaller(false);
      } else if (!isSmaller && window.innerWidth <= breakPoint) {
        setIsSmaller(true);
      }
    }
    if (typeof window !== "undefined")
      window.addEventListener("resize", screenResized);
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("resize", screenResized);
    };
  }, [isSmaller]);
  return isSmaller;
};
