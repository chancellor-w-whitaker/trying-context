export const Dropdown = ({ className, ...rest }) => {
  return (
    <>
      <div className={`dropdown ${className}`.trimEnd()} {...rest}></div>
    </>
  );
};

export const DropdownButton = ({ className, ...rest }) => {
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
};

export const DropdownMenu = ({ className, ...rest }) => {
  return (
    <>
      <ul className={"dropdown-menu"}></ul>
    </>
  );
};
