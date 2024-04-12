function CarItem(props) {
  console.log("items", props.item);
  const renderCarDetails = () => {
    return Object.keys(props.item).map((key) => {
      if (key === "id" || key === "duration" || key === "imageUrl") {
        return null;
      }
      if (typeof props.item[key] === "object") {
        return Object.keys(props.item[key]).map((subKey) => (
          <div
            key={subKey}
            className="text-nowrap bg-light border fs-6 d-flex justify-content-between"
          >
            <span className="fw-bolder">{subKey}</span>
            <span>{props.item[key][subKey]}</span>
          </div>
        ));
      } else {
        return (
          <div
            key={key}
            className="text-nowrap bg-light border fs-6 d-flex justify-content-between"
          >
            <span className="fw-bolder">{key}</span>
            <span>{props.item[key]}</span>
          </div>
        );
      }
    });
  };

  return (
    <>
      {/* {console.log("Item", props.item)} */}
      <div className="col-sm">
        <div className="container-xl ">
          <div className="card">
            <h5 className="card-header  bg-primary text-center">
              {props.item.brand}
            </h5>
            <div className="card-body">
              <h5 className="card-title text-center">
                Information of {props.item.brand} {props.item.model}
              </h5>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div style={{ width: "60%" }}>
                  <img
                    src={props.item.imageUrl}
                    className="img-fluid mx-auto d-block"
                    alt="..."
                  />
                </div>
              </div>
              <div className="row justify-content-center ">
                <div className="col-md-8  "></div>
                <div className="col-md-8 mt-3">
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div style={{ width: "60%" }}>{renderCarDetails()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarItem;
