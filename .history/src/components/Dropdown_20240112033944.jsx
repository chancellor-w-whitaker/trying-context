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

export const DropdownTrigger = memo(({ className, ...rest }) => {
  return (
    <>
      <button
        className={`btn btn-secondary dropdown-toggle ${className}`.trimEnd()}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        type="button"
        {...rest}
      ></button>
    </>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownItem = ({ className = "", ...rest }) => {
  return (
    <>
      <li>
        <button
          className={`dropdown-item ${className}`.trimEnd()}
          type="button"
          {...rest}
        ></button>
      </li>
    </>
  );
};

export const DropdownItemParent = memo(({ onClick, field, value, ...rest }) => {
  const onItemClick = () => onClick(field, value);

  return (
    <>
      <DropdownItem onClick={onItemClick} {...rest}></DropdownItem>
    </>
  );
});

DropdownItemParent.displayName = "DropdownItemParent";
