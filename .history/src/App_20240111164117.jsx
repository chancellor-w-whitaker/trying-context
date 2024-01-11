import {
  MemoableDropdownItem,
  DropdownTrigger,
  Dropdown,
} from "./components/Dropdown";
import { ListGroupItem, ListGroup } from "./components/ListGroup";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { Container } from "./components/Container";
import { fileNames } from "./constants/fileNames";
import { Table } from "./components/Table";
import "./App.css";

/*
  prevent scrollbar page layout shift
    - write to index.css
*/
/*
  how to handle filters & lists being remembered?
    - write to useProvideGlobally in AppContextProvider.jsx
    - should you change state structure of checklist?
*/

const App = () => {
  useBodyBgVariant("primary-subtle");

  const {
    onDropdownItemClick,
    onFileChange,
    fieldFilters,
    fieldLists,
    fileName,
    data,
  } = useAppContext();

  return (
    <>
      <Container>
        <div className="d-flex flex-column gap-4">
          <Table
            columnDefs={
              data.length > 0
                ? Object.keys(data[0]).map((field) => ({ field }))
                : []
            }
          ></Table>
          <ListGroup className="shadow-sm">
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
                      <MemoableDropdownItem
                        className={
                          fieldFilters[field]?.has(value) ? "active" : ""
                        }
                        onClick={onDropdownItemClick}
                        field={field}
                        value={value}
                        key={value}
                      >
                        {value}
                      </MemoableDropdownItem>
                    ))}
                  </>
                }
                trigger={
                  <DropdownTrigger
                    data-bs-auto-close="outside"
                    className="shadow-sm"
                  >
                    {field}
                  </DropdownTrigger>
                }
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
