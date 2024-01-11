import { useEffect } from "react";
import { useState } from "react";

export const useData = (url, onBeforeEnd) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return data;
};
