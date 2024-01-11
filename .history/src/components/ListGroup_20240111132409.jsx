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
  children,
  checked,
  value,
  name,
}) => {
  return (
    <>
      <label className="list-group-item d-flex gap-2">
        <input
          className="form-check-input flex-shrink-0"
          onChange={onChange}
          checked={checked}
          value={value}
          type={type}
          name={name}
        />
        <span>{children}</span>
      </label>
    </>
  );
};
