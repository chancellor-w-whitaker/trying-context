import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <AppContext.Provider value={}>{children}</AppContext.Provider>
 
  );
}
