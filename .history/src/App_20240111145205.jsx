import { ListGroupItem, ListGroup } from "./components/ListGroup";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import { fileNames } from "./constants/fileNames";
import { Dropdown } from "./components/Dropdown";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { onFileChange, fieldFilters, fieldLists, fileName, data } =
    useAppContext();

  console.log(data);

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
        <div className="d-flex gap-3">
          {Object.entries(fieldLists).map((field, list) => (
            <Dropdown key={field}></Dropdown>
          ))}
        </div>
      </Container>
    </>
  );
};

export default App;
