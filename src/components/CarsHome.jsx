import {useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import AuctionCard from "./AuctionCard";



function CarsHome() {
  const { carItem } = useContext(GlobalContext)
  return (
      <div className="py-5">
      <div className="container">
        {carItem && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {carItem.map((car) => (
              <Link to={`/cars/${car.id}`} key={car.id} style={{textDecoration:'none'}}> 
                <AuctionCard item={car} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}





export default CarsHome
