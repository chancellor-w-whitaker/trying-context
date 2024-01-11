import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { Container } from "./components/Container";
import { useAppContext } from "./hooks/useAppContext";
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
