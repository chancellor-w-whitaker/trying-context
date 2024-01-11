import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { setFileName, fileName, data } = useAppContext();

  console.log(data);

  return (
    <>
      <Container></Container>
    </>
  );
};

export default App;
