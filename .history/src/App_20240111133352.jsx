import { ListGroupItem, ListGroup } from "./components/ListGroup";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import { fileNames } from "./constants/fileNames";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { setFileName, fileName, data } = useAppContext();

  console.log(data);

  return (
    <>
      <Container>
        <ListGroup>
          {fileNames.map((thisFileName) => (
            <ListGroupItem value={thisFileName} key={thisFileName} type="radio">
              {thisFileName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default App;
