import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "./authentiction/AuthContext";
import AuctionCard from "./AuctionCard";
function CarsHome() {
  const { carItem, setFilteredCartItems, fetchError } =
    useContext(GlobalContext);

  useEffect(() => {
    setFilteredCartItems(true);
  }, []);
  function handleClick() {
    setFilteredCartItems(false);
  }
  console.log("fetchError", fetchError);
  console.log("Carhomome", carItem);
  return (
    <div className="py-3" id="auctioncard">
      {carItem && carItem.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {carItem.map((car) => (
            <div
              className="col-12 col-sm-6 col-md-4 "
              key={car.id}
              data-test={`countdown-${car.id}`}
            >
              <Link
                to={`/cars/${car.id}`}
                key={car.id}
                style={{ textDecoration: "none" }}
                onClick={handleClick}
              >
                <AuctionCard item={car} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Alert variant="info">{fetchError}</Alert>
      )}
    </div>
  );
}

export default CarsHome;
