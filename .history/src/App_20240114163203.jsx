import {
  DropdownButton,
  ListGroupItem,
  DropdownMenu,
  ListGroup,
  Dropdown,
} from "./components/ListComps";
import { useAppContext } from "./hooks/useAppContext";
import { toTitleCase } from "./functions/toTitleCase";
import { fileNames } from "./constants/fileNames";
import "./App.css";

const App = () => {
  const {
    onColumnFilterChange,
    dropdownMenuStyle,
    columnFilters,
    onFileChange,
    fileName,
  } = useAppContext();

  return (
    <>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex flex-wrap gap-3">
          <Dropdown className="col">
            <DropdownButton
              data-bs-auto-close="outside"
              className="w-100 shadow-sm"
              variant="light"
            >
              <span className="dropdown-toggle d-flex align-items-center justify-content-center">
                Data
              </span>
              <small className="d-block text-body-secondary">
                {fileNames.find(({ id }) => id === fileName).displayName}
              </small>
              {/* <span>
                <span className="dropdown-toggle d-flex align-items-center justify-content-center">
                  Data
                </span>
                <small className="d-block text-body-secondary">
                  {fileNames.find(({ id }) => id === fileName).displayName}
                </small>
              </span> */}
            </DropdownButton>
            <DropdownMenu
              className="shadow-sm overflow-y-scroll"
              style={dropdownMenuStyle}
            >
              <ListGroup className="list-group-flush">
                {fileNames.map(({ displayName, id }) => (
                  <ListGroupItem
                    checked={id === fileName}
                    onChange={onFileChange}
                    className="border-0"
                    type="radio"
                    name="file"
                    value={id}
                    key={id}
                  >
                    {displayName}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex flex-wrap gap-3">
          {Object.entries(columnFilters).map(
            ([field, { relevant: fieldRelevance, checklist }]) =>
              fieldRelevance && (
                <Dropdown className="col" key={field}>
                  <DropdownButton
                    className="w-100 shadow-sm d-flex align-items-center justify-content-center"
                    data-bs-auto-close="outside"
                    variant="light"
                  >
                    {toTitleCase(field)}
                  </DropdownButton>
                  <DropdownMenu
                    className="shadow-sm overflow-y-scroll"
                    style={dropdownMenuStyle}
                  >
                    <ListGroup className="list-group-flush">
                      {Object.entries(checklist).map(
                        ([value, { relevant: valueRelevance, checked }]) => (
                          <ListGroupItem
                            className={`border-0${
                              !valueRelevance ? " opacity-50" : ""
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
    </>
  );
};

export default App;
