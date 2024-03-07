import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import AuctionCard from "./AuctionCard";

function CarsHome() {
  const { carItem, auction } = useContext(GlobalContext);

  return (
    <div className="py-5">
      <div className="container">
        {carItem && auction && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {carItem.map((car) => {
              const carAuction = auction.find((item) => item.carId === car.id);
              const carDuration = carAuction ? carAuction.duration : "N/A";

              return (
                <Link
                  to={`/cars/${car.id}`}
                  key={car.id}
                  style={{ textDecoration: "none" }}
                >
                  <AuctionCard item={car} duration={carDuration} />

                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarsHome;
