import { memo } from "react";

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

export const DropdownTrigger = memo((props) => {
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
});

DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownItem = memo(({ className = "", children, ...rest }) => {
  return (
    <>
      <li {...rest}>
        <button
          className={`dropdown-item ${className}`.trimEnd()}
          type="button"
        >
          {children}
        </button>
      </li>
    </>
  );
});

DropdownItem.displayName = "DropdownItem";
