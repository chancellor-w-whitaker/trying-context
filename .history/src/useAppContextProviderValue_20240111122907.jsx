import { useState } from "react";

import { fileNames } from "./constants/fileNames";
import { useMyAppLogic } from "./useMyAppLogic";
import { useJSON } from "./hooks/useJSON";

export const useAppContextProviderValue = () => useMyAppLogic();
