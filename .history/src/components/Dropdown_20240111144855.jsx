export const Dropdown = ({
  trigger = (
    <button data-bs-toggle="dropdown" aria-expanded="false" type="button">
      Dropdown trigger
    </button>
  ),
}) => {
  return (
    <>
      <div className="dropdown">
        {trigger}
        <ul className="dropdown-menu">...</ul>
      </div>
    </>
  );
};
