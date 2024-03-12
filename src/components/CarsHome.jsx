import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { AuthContext } from "./authentiction/AuthContext";
import AuctionCard from "./AuctionCard";
function CarsHome() {
  const { carItem } = useContext(GlobalContext);
  const { currentUser } = useContext(AuthContext);
  console.log("CarHOme", carItem);

  return (
    <div className="py-5">
      <div className="container">
        {carItem && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {carItem.map((car) => (
              <Link
                to={`/cars/${car.id}`}
                key={car.id}
                style={{ textDecoration: "none" }}
              >
                <AuctionCard item={car} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarsHome;
