import Countdown from "react-countdown";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authentiction/AuthContext";
const renderer = ({ days, hours, minutes, props }) => {
  return (
    <>
      <div className="col">
        <div className="card shadow-sm">
          <div
            style={{
              height: "93px",
              backgroundImage: `url(${props.item.imageUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-100"
          />

          <div className="card-body">
            <p className="lead display-8">{props.item.brand}</p>
            <div className="d-flex jsutify-content-between align-item-center">
              <p>
                Ends in {days} days {hours} hours {minutes} min
              </p>
            </div>
            <p className="card-text">{props.item.desc}</p>
            <div className="d-flex justify-content-between align-item-center">
              <p className="display-7">${props.item.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AuctionCard = ({ item }) => {
  // console.log("Item", item);
  let expiredDate = new Date(item.duration).getTime();

  return <Countdown date={expiredDate} item={item} renderer={renderer} />;
};

export default AuctionCard;
