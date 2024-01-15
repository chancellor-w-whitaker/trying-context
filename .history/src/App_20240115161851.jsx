import {
  DropdownButton,
  DropdownToggle,
  ListGroupItem,
  DropdownMenu,
  ListGroup,
  Dropdown,
} from "./components/ListComps";
import { regressionTypes } from "./constants/regressionTypes";
import { useAppContext } from "./hooks/useAppContext";
import { toTitleCase } from "./functions/toTitleCase";
import { fileNames } from "./constants/fileNames";
import "./App.css";

const App = () => {
  const {
    onRegressionTypeChange,
    onColumnFilterChange,
    dropdownMenuStyle,
    onFileNameChange,
    onGroupByChange,
    regressionType,
    columnFilters,
    fileName,
    groupBy,
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
              <DropdownToggle>Data</DropdownToggle>
              <small className="d-block text-body-secondary">
                {fileNames.find(({ id }) => id === fileName).displayName}
              </small>
            </DropdownButton>
            <DropdownMenu
              className="shadow-sm overflow-y-scroll"
              style={dropdownMenuStyle}
            >
              <ListGroup className="list-group-flush">
                {fileNames.map(({ displayName, id }) => (
                  <ListGroupItem
                    onChange={onFileNameChange}
                    checked={id === fileName}
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
          <Dropdown className="col">
            <DropdownButton
              data-bs-auto-close="outside"
              className="w-100 shadow-sm"
              variant="light"
            >
              <DropdownToggle>Regression Type</DropdownToggle>
              <small className="d-block text-body-secondary">
                {regressionType}
              </small>
            </DropdownButton>
            <DropdownMenu
              className="shadow-sm overflow-y-scroll"
              style={dropdownMenuStyle}
            >
              <ListGroup className="list-group-flush">
                {regressionTypes.map((thisRegType) => (
                  <ListGroupItem
                    checked={thisRegType === regressionType}
                    onChange={onRegressionTypeChange}
                    className="border-0"
                    value={thisRegType}
                    key={thisRegType}
                    name="regression"
                    type="radio"
                  >
                    {thisRegType}
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
                    <DropdownToggle>{toTitleCase(field)}</DropdownToggle>
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
