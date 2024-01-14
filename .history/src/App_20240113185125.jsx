import {
  DropdownItemParent,
  DropdownTrigger,
  Dropdown,
} from "./components/Dropdown";
import { ListGroupItem, ListGroup } from "./components/ListGroup";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { toTitleCase } from "./functions/toTitleCase";
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
            {Object.entries(columnFilters).map(
              ([field, { relevant: fieldRelevance, checklist }]) => (
                <Dropdown
                  menuContent={
                    <>
                      {Object.entries(checklist).map(
                        ([value, { relevant: valueRelevance, checked }]) => (
                          <DropdownItemParent
                            className={checked ? "active" : ""}
                            onClick={onColumnFilterItemClick}
                            disabled={!valueRelevance}
                            field={field}
                            value={value}
                            key={value}
                          >
                            <ListGroupItem>{value}</ListGroupItem>
                          </DropdownItemParent>
                        )
                      )}
                    </>
                  }
                  trigger={
                    <DropdownTrigger
                      data-bs-auto-close="outside"
                      className="shadow-sm w-100"
                      disabled={!fieldRelevance}
                    >
                      {toTitleCase(field)}
                    </DropdownTrigger>
                  }
                  className="col"
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
