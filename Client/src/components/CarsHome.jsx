import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "./authentiction/AuthContext";
import AuctionCard from "./AuctionCard";
function CarsHome() {
  const { carItem, setFilteredCartItems } = useContext(GlobalContext);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    setFilteredCartItems(true);
  }, []);
  function handleClick() {
    setFilteredCartItems(false);
  }
  console.log("Carhomome", carItem);
  return (
    <div className="py-3">
      {carItem && (
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {carItem.map((car) => (
            <div className="col-12 col-sm-6 col-md-4 " key={car.id}>
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
      )}
    </div>
  );
}

export default CarsHome;
