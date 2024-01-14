import {
  DropdownButton,
  ListGroupItem,
  DropdownMenu,
  ListGroup,
  Dropdown,
} from "./components/ListComps";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { useAppContext } from "./hooks/useAppContext";
import { toTitleCase } from "./functions/toTitleCase";
import { Container } from "./components/Container";
import { fileNames } from "./constants/fileNames";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  const { onColumnFilterChange, columnFilters, onFileChange, fileName } =
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
          <div>
            {Object.entries(columnFilters).map(
              ([field, { relevant: fieldRelevance, checklist }]) => (
                <Dropdown key={field}>
                  <DropdownButton
                    data-bs-auto-close="outside"
                    className="shadow-sm"
                    variant="light"
                  >
                    {toTitleCase(field)}
                  </DropdownButton>
                  <DropdownMenu className="py-0 border-0">
                    <ListGroup className="border shadow-sm">
                      {Object.entries(checklist).map(
                        ([value, { relevant: valueRelevance, checked }]) => (
                          <ListGroupItem
                            className={`border-0${
                              valueRelevance ? "" : " opacity-50"
                            }`}
                            onChange={onColumnFilterChange}
                            checked={checked}
                            type="checkbox"
                            value={value}
                            name={field}
                            key={value}
                          >
                            {value}
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </DropdownMenu>
                </Dropdown>
              )
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
