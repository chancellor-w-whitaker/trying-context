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
          {/* <div className="d-flex flex-wrap gap-3"> */}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              type="button"
            >
              Dropdown
            </button>
            <ul className="dropdown-menu">
              <div className={"list-group" + " list-group-flush"}>
                <label className="list-group-item d-flex gap-2">
                  <input
                    className="form-check-input flex-shrink-0"
                    defaultChecked=""
                    type="checkbox"
                    defaultValue=""
                  />
                  <span>
                    First checkbox
                    <small className="d-block text-body-secondary">
                      With support text underneath to add more detail
                    </small>
                  </span>
                </label>
                <label className="list-group-item d-flex gap-2">
                  <input
                    className="form-check-input flex-shrink-0"
                    type="checkbox"
                    defaultValue=""
                  />
                  <span>
                    Second checkbox
                    <small className="d-block text-body-secondary">
                      Some other text goes here
                    </small>
                  </span>
                </label>
                <label className="list-group-item d-flex gap-2">
                  <input
                    className="form-check-input flex-shrink-0"
                    type="checkbox"
                    defaultValue=""
                  />
                  <span>
                    Third checkbox
                    <small className="d-block text-body-secondary">
                      And we end with another snippet of text
                    </small>
                  </span>
                </label>
              </div>
            </ul>
          </div>

          {/* {Object.entries(columnFilters).map(
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
                            {value}
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
            )} */}
          {/* </div> */}
        </div>
      </Container>
    </>
  );
};

export default App;
