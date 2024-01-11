export const ListGroup = ({ children }) => {
  return (
    <>
      <div className="list-group">{children}</div>
    </>
  );
};

export const ListGroupItem = ({
  type = "checkbox",
  onChange,
  checked,
  value,
  name,
}) => {
  return (
    <>
      <label className="list-group-item d-flex gap-2">
        <input
          className="form-check-input flex-shrink-0"
          type="radio"
          name={name}
        />
        <span>
          First radio
          <small className="d-block text-body-secondary">
            With support text underneath to add more detail
          </small>
        </span>
      </label>
    </>
  );
};
