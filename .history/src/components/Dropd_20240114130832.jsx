export const Dropdown = ({ className = "", ...rest }) => {
  return (
    <>
      <div className={`dropdown ${className}`.trimEnd()} {...rest}></div>
    </>
  );
};

export const DropdownButton = ({
  variant = "secondary",
  className = "",
  ...rest
}) => {
  return (
    <>
      <button
        className={`btn btn-${variant} dropdown-toggle ${className}`.trimEnd()}
        {...rest}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        type="button"
      ></button>
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

export const ListGroup = ({ className, ...rest }) => {
  return (
    <>
      <div className={`list-group ${className}`.trimEnd()}></div>
    </>
  );
};
