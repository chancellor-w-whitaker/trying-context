import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </Container>
    </>
  );
};

export default App;
