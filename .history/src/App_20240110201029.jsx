import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { Container } from "./components/Container";

const App = () => {
  useBodyBgVariant("primary-subtle");

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </C>
    </>
  );
};

export default App;
