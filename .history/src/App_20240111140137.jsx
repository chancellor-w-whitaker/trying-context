import { ListGroupItem, ListGroup } from "./components/ListGroup";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import { fileNames } from "./constants/fileNames";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { onFileChange, fetchResult, fileName } = useAppContext();

  console.log(fetchResult);

  return (
    <>
      <Container>
        <ListGroup>
          {fileNames.map((thisFileName) => (
            <ListGroupItem
              checked={thisFileName === fileName}
              onChange={onFileChange}
              value={thisFileName}
              key={thisFileName}
              type="radio"
              name="file"
            >
              {thisFileName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default App;
