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
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        type="button"
        {...rest}
      ></button>
    </>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownItem = ({ className = "", children, ...rest }) => {
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
};

export const MemoableDropdownItem = memo(
  ({ onClick, field, value, ...rest }) => {
    const onItemClick = () => onClick(field, value);

    return (
      <>
        <DropdownItem onClick={onItemClick} {...rest}></DropdownItem>
      </>
    );
  }
);

MemoableDropdownItem.displayName = "MemoableDropdownItem";
