export const ListGroup = () => {
  return (
    <>
      <div className="list-group">
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            name="listGroupRadios"
            id="listGroupRadios1"
            defaultChecked=""
            defaultValue=""
            type="radio"
          />
          <span>
            First radio
            <small className="d-block text-body-secondary">
              With support text underneath to add more detail
            </small>
          </span>
        </label>
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            name="listGroupRadios"
            id="listGroupRadios2"
            defaultValue=""
            type="radio"
          />
          <span>
            Second radio
            <small className="d-block text-body-secondary">
              Some other text goes here
            </small>
          </span>
        </label>
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            name="listGroupRadios"
            id="listGroupRadios3"
            defaultValue=""
            type="radio"
          />
          <span>
            Third radio
            <small className="d-block text-body-secondary">
              And we end with another snippet of text
            </small>
          </span>
        </label>
      </div>
    </>
  );
};
