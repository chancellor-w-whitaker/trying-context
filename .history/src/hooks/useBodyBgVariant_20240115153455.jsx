import { useLayoutEffect } from "react";

export const useBodyBgVariant = (variant) => {
  useLayoutEffect(() => {
    document.body.classList.add(`bg-${variant}`);

    return () => {
      document.body.classList.remove(`bg-${variant}`);
    };
  }, [variant]);
};
