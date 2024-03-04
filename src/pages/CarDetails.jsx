import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../components/GlobalContext.jsx";
import CarItem from "../components/CarItem.jsx";
import BidItem from "../components/BidItem.jsx";

function CarDetail() {
  const { carItem, auction } = useContext(GlobalContext);
  const { id } = useParams();
  const idAsInt = parseInt(id);
  console.log(id);
  console.log(carItem);
  const carId = carItem.find((car) => car.id === idAsInt);
  console.log("CarId", carId);
  return (
    <>
      <div className="container-xl">
        <div className="row">
          {<CarItem item={carId} key={id} />}
          <div className="col col-lg-2">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item" key={1}>
                  An item
                </li>
                <li className="list-group-item" key={2}>
                  A second item
                </li>
                <li className="list-group-item" key={3}>
                  A third item
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarDetail;
