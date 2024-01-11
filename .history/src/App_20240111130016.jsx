import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import { Dashboard } from "./components/Dashboard";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const data = useAppContext();

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </Container>
    </>
  );
};

export default App;
