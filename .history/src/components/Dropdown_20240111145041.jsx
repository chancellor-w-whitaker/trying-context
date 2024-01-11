export const Dropdown = ({
  menuContent = (
    <>
      <li>
        <button className="dropdown-item" type="button">
          Action
        </button>
      </li>
      <li>
        <button className="dropdown-item" type="button">
          Another action
        </button>
      </li>
      <li>
        <button className="dropdown-item" type="button">
          Something else here
        </button>
      </li>
    </>
  ),
  trigger = (
    <button
      className="btn btn-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      type="button"
    >
      Dropdown
    </button>
  ),
}) => {
  return (
    <>
      <div className="dropdown">
        {trigger}
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" type="button">
              Action
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Another action
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Something else here
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
