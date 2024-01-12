import { useEffect } from "react";
import { useState } from "react";

export const useJSON = (url, onBeforeEnd) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            typeof onBeforeEnd === "function"
              ? onBeforeEnd(json, setResult)
              : setResult(json);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url, onBeforeEnd]);

  return result;
};
