import FilterModel from "./FilterModel";
import FiltrePrice from "./FiltrePrice";

function Filter() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {/* Aquí colocas el search box */}
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
          <div className="col-md-3">
            {/* Aquí colocas el primer Form.Select */}
            <FilterModel />
          </div>
          <div className="col-md-3">
            {/* Aquí colocas el segundo Form.Select */}
            <FiltrePrice />
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
