import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return <AppContext.Provider value={tasks}>{children}</AppContext.Provider>;
};

const useAppContextProviderValue = () => {
  return {};
};
