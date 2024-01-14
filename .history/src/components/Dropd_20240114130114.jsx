export const Dropdown = ({ className, ...rest }) => {
  return (
    <>
      <div className={`dropdown ${className}`.trimEnd()} {...rest}></div>
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
