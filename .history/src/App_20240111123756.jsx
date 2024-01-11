import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { Container } from "./components/Container";
import { Dashboard } from "./components/Dashboard";
import { useMyAppLogic } from "./useMyAppLogic";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const appLogic = useMyAppLogic();

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </Container>
    </>
  );
};

export default App;
