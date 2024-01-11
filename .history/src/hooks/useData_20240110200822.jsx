import { useEffect } from "react";
import { useState } from "react";

export const useData = ({ onBeforeEnd, url }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            typeof onBeforeEnd === "function"
              ? onBeforeEnd(json, setData)
              : setData(json);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url, onBeforeEnd]);

  return data;
};
