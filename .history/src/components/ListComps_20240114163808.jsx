import { memo } from "react";

export const Dropdown = ({ className = "", ...rest }) => {
  return (
    <>
      <div className={`dropdown ${className}`.trimEnd()} {...rest}></div>
    </>
  );
};

export const DropdownButton = memo(
  ({ variant = "secondary", className = "", ...rest }) => {
    return (
      <>
        <button
          className={`btn btn-${variant} hide-dropdown-toggle dropdown-toggle ${className}`.trimEnd()}
          {...rest}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          type="button"
        ></button>
      </>
    );
  }
);

DropdownButton.displayName = "DropdownButton";

export const DropdownToggle = ({ className = "", ...rest }) => {
  return (
    <>
      <span
        className={`dropdown-toggle d-flex align-items-center justify-content-center ${className}`.trimEnd()}
        {...rest}
      ></span>
    </>
  );
};

export const DropdownMenu = ({ className = "", ...rest }) => {
  return (
    <>
      <ul className={`dropdown-menu ${className}`.trimEnd()} {...rest}></ul>
    </>
  );
};

export const ListGroup = ({ className = "", ...rest }) => {
  return (
    <>
      <div className={`list-group ${className}`.trimEnd()} {...rest}></div>
    </>
  );
};

export const ListGroupItem = memo(
  ({
    type = "checkbox",
    className = "",
    onChange,
    children,
    checked,
    value,
    name,
  }) => {
    return (
      <>
        <label
          className={`list-group-item d-flex gap-2 ${className}`.trimEnd()}
        >
          <input
            className="form-check-input flex-shrink-0"
            {...{ onChange, checked, value, type, name }}
          />
          <span>{children}</span>
        </label>
      </>
    );
  }
);

ListGroupItem.displayName = "ListGroupItem";
