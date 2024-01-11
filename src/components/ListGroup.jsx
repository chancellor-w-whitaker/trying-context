import { memo } from "react";

export const ListGroup = ({ className, ...rest }) => {
  return (
    <>
      <div className={`list-group ${className}`.trimEnd()} {...rest}></div>
    </>
  );
};

export const ListGroupItem = memo(
  ({ type = "checkbox", onChange, children, checked, value, name }) => {
    return (
      <>
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            {...{ onChange, checked, value, name, type }}
          />
          <span>{children}</span>
        </label>
      </>
    );
  }
);

ListGroupItem.displayName = "ListGroupItem";
