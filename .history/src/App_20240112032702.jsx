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
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { onColumnFilterItemClick, columnFilters, onFileChange, fileName } =
    useAppContext();

  return (
    <>
      <Container>
        <div className="d-flex flex-column gap-4">
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
            {Object.entries(fieldChecklists).map(
              ([field, { options, checked }]) => (
                <Dropdown
                  menuContent={
                    <>
                      {options.map((value) => (
                        <MemoableDropdownItem
                          className={checked.has(value) ? "active" : ""}
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
              )
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
