import { useEffect } from "react";

export const useBodyBgVariant = (variant) => {
  useEffect(() => {
    document.body.classList.add(`bg-${variant}`);

    return () => {
      document.body.classList.remove(`bg-${variant}`);
    };
  }, [variant]);
};
