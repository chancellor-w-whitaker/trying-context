export const Dropdown = ({
  menuContent = (
    <>
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Another action</DropdownItem>
      <DropdownItem>Something else here</DropdownItem>
    </>
  ),
  trigger = <DropdownTrigger>Dropdown</DropdownTrigger>,
}) => {
  return (
    <>
      <div className="dropdown">
        {trigger}
        <ul className="dropdown-menu">{menuContent}</ul>
      </div>
    </>
  );
};

export const DropdownTrigger = (props) => {
  return (
    <>
      <button
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        type="button"
        {...props}
      ></button>
    </>
  );
};

export const DropdownItem = ({ className = "", children, ...rest }) => {
  return (
    <>
      <li {...rest}>
        <button className="dropdown-item" type="button">
          {children}
        </button>
      </li>
    </>
  );
};
