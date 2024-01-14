export const Dropdown = ({ className, ...rest }) => {
  return (
    <>
      <div className={`dropdown ${className}`.trimEnd()} {...rest}></div>
    </>
  );
};

export const DropdownButton = ({ className, variant, ...rest }) => {
  return (
    <>
      <button
        className={`btn btn-${variant} dropdown-toggle ${className}`.trimEnd()}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        type="button"
        {...rest}
      ></button>
    </>
  );
};

export const DropdownMenu = ({ className, ...rest }) => {
  return (
    <>
      <ul className={`dropdown-menu ${className}`.trimEnd()} {...rest}></ul>
    </>
  );
};

export const ListGroup = () => {
  return (
    <>
      <div className="list-group"></div>
    </>
  );
};
