function CarItem(props) {
  console.log("items", props.item);
  const renderCarDetails = () => {
    const customnames = {
      brand: "Factory",
      model: "Model",
      price: "Price",
      year: "Year",
      color: "Color",
      mileage: "Mileage",
      engine_type: "Type of Motor",
      engine_displacement: "Engine Displacement",
      transmission: "Transmission",
    };
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
            <span className="fw-bolder">{customnames[subKey]}</span>
            <span>{props.item[key][subKey]}</span>
          </div>
        ));
      } else if (key === "features") {
        const featuresArray = props.item[key]
          .split(",")
          .map((feature, index) => <li key={index}>{feature.trim()}</li>);

        return (
          <div key={key} className="text-nowrap bg-light border fs-6">
            <span className="fw-bolder">Features:</span>
            <ul>{featuresArray}</ul>
          </div>
        );
      } else {
        return (
          <div
            key={key}
            className="text-nowrap bg-light border fs-6 d-flex justify-content-between"
          >
            <span className="fw-bolder">{customnames[key]}</span>
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
          <div className="card" id={`card-${props.item.model}`}>
            <h5 className="card-header  bg-primary text-center">
              {props.item.brand}
            </h5>
            <div className="card-body">
              <h5
                className="card-title text-center"
                id={`card-title${props.item.brand}`}
              >
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
