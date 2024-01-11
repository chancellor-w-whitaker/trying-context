import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { Container } from "./components/Container";
import { Dashboard } from "./components/Dashboard";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { setFileName, fileName, data } = useAppContext();

  console.log(data);

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </Container>
    </>
  );
};

export default App;
