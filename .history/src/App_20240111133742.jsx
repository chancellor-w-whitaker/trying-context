import { startTransition, useCallback } from "react";

import { ListGroupItem, ListGroup } from "./components/ListGroup";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import { fileNames } from "./constants/fileNames";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { setFileName, fileName, data } = useAppContext();

  const listGroupItemOnChange = useCallback(
    (e) => startTransition(() => setFileName(e.target.value)),
    []
  );

  console.log(data);

  return (
    <>
      <Container>
        <ListGroup>
          {fileNames.map((thisFileName) => (
            <ListGroupItem
              onChange={(e) => setFileName(e.target.value)}
              checked={thisFileName === fileName}
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
