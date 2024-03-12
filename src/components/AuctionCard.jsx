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
              height: "320px",
              backgroundImage: `url(https://media.istockphoto.com/id/1157655660/es/foto/suv-rojo-gen%C3%A9rico-sobre-un-fondo-blanco-vista-lateral.jpg?s=612x612&w=0&k=20&c=0I2xA9oCnNUfluy5m1ErkM4NwHQOkhDUr2HwKXNO1z8=)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-100"
          />

          <div className="card-body">
            <p className="lead display-6">{props.auction.brand}</p>
            <div className="d-flex jsutify-content-between align-item-center">
              <h5>
                {days}days {hours} hr: {minutes} min:
              </h5>
            </div>
            <p className="card-text">{props.auction.desc}</p>
            <div className="d-flex justify-content-between align-item-center">
              <p className="display-6">${props.auction.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AuctionCard = ({ item }) => {
  console.log(item);
  let expiredDate = new Date(item.duration).getTime();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  console.log(currentUser);
  const [auction, setAuction] = useState([]);
  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const response = await fetch("api/Auctions");
        if (!response.ok) throw Error("Did not receive expected data");
        const listDurationItem = await response.json();
        const foundItem = listDurationItem.find((a) => a.carId === item.id);
        console.log(foundItem);
        if (foundItem) {
          setAuction({ ...item, userId: foundItem.userId });
        }

        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDurations();
  }, []);

  console.log(auction);
  return (
    <Countdown
      auction={auction}
      owner={currentUser}
      date={expiredDate}
      item={item}
      renderer={renderer}
    />
  );
};

export default AuctionCard;
