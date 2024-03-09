import { useState } from "react";
import Countdown from "react-countdown";

function BidItem({ item, userId }) {
  const date = new Date(item.endTime);
  const [bidText, setBidText] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const latestBid = item.latestBid || {};
  const highestBidAmount = latestBid.bidAmount || 0;

  const renderer = ({ hours, minutes }) => {
    return (
      <span className="align-middle fs-4">
        {hours}hr :{minutes} min
      </span>
    );
  };

  async function addNewBid(event) {
    event.preventDefault(); // Förhindra standardbeteendet för formuläret

    const newBid = {
      auctionId: item.id,
      bidAmount: parseInt(bidText),
      userId: userId, // Lägg till userId i budet
    };

    try {
      // Skicka budet till servern
      const response = await fetch("/api/bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBid),
      });

      if (response.ok) {
        // Uppdatera budet på hemsidan om anropet till servern lyckades
        updateBidOnWebsite(parseInt(bidText));
        setFeedbackMessage("Bid placed successfully!");
      } else {
        setFeedbackMessage("Failed to place bid. Please try again.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      setFeedbackMessage("An error occurred while placing the bid. Please try again later.");
    }
  }

  async function updateBidOnWebsite(newBidAmount) {
    // Implementera funktionen för att uppdatera budet på hemsidan här
    // Det kan vara att du behöver göra ett anrop till en annan API-endpoint eller uppdatera state för att spegla det nya budet på hemsidan
  }

  function setNewBidText(event) {
    setBidText(event.target.value);
  }

  return (
    <>
      <div className="card">
        <div className="text-center">
          <div className="row">
            <div className="col">
              <span className="fs-6">Termina :</span>
              <br />
              <span>
                {`${date.getDate()} ${date.toLocaleString("default", {
                  month: "short",
                })} ${date.getFullYear()}`}
              </span>
            </div>
            <div className="col" style={{ paddingTop: "10px" }}>
              <Countdown date={date} renderer={renderer} />
            </div>
          </div>
        </div>
        <div className=" text-center">
          <p className="fs-5">$ {item.price} </p>
        </div>
        <div
          className="d-grid gap-2 col-6 mx-auto b-1"
          style={{ paddingBottom: "10px" }}
        >
          <form onSubmit={addNewBid}>
            <input
              className="form-control"
              type="number"
              value={bidText}
              onChange={setNewBidText}
              placeholder="Enter your bid"
            />
            <button className="btn btn-outline-secondary mt-2" type="submit">
              Bid
            </button>
          </form>
          {feedbackMessage && <p className="text-success">{feedbackMessage}</p>}
        </div>
        <div className="text-center">
          <p>Highest Bid: ${highestBidAmount}</p>
        </div>
        {item.features && (
          <ul className="list-group list-group-flush">
            {item.features.map((feature, index) => (
              <li className="list-group-item" key={index}>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default BidItem;