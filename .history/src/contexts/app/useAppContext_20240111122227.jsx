import { useContext } from "react";

import { AppContext } from "./contexts/app/AppContext";

export const useAppContext = () => useContext(AppContext);
