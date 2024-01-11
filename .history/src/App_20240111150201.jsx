import { DropdownTrigger, DropdownItem, Dropdown } from "./components/Dropdown";
import { ListGroupItem, ListGroup } from "./components/ListGroup";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import { fileNames } from "./constants/fileNames";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { onFileChange, fieldFilters, fieldLists, fileName, data } =
    useAppContext();

  console.log(data);

  return (
    <>
      <Container>
        <div className="d-flex flex-column gap-5">
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
          <div className="d-flex flex-wrap gap-3">
            {Object.entries(fieldLists).map(([field, list]) => (
              <Dropdown
                menuContent={
                  <>
                    {list.map((value) => (
                      <DropdownItem key={value}></DropdownItem>
                    ))}
                  </>
                }
                trigger={<DropdownTrigger>{field}</DropdownTrigger>}
                key={field}
              ></Dropdown>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
