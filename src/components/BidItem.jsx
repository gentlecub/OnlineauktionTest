import { useState } from "react";
import Countdown from "react-countdown";

function BidItem({ item, userId }) { // Ta emot userId som en prop
  const date = new Date(item.endTime);
  const [bidText, setBidText] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isBidSuccessful, setIsBidSuccessful] = useState(true);

  const latestBid = item.latestBid || {};
  const highestBidAmount = latestBid.bidAmount || 0;

  const renderer = ({ hours, minutes }) => (
    <span className="align-middle fs-4">
      {hours}hr :{minutes} min
    </span>
  );

  const validateBid = (bidAmount) => {
    if (isNaN(bidAmount)) {
      setFeedbackMessage("Please enter a valid number for your bid.");
      setIsBidSuccessful(false);
      return false;
    }

    if (bidAmount <= highestBidAmount) {
      setFeedbackMessage(`Your bid must be higher than the current highest bid of $${highestBidAmount}.`);
      setIsBidSuccessful(false);
      return false;
    }

    return true;
  };

  async function addNewBid(event) {
    event.preventDefault();

    const bidAmount = parseInt(bidText);
    if (!validateBid(bidAmount)) return;

    const newBid = {
      auctionId: item.id,
      bidAmount: bidAmount,
      userId, // Använd userId här som tas emot som en prop
    };

    try {
      // Uppdatera denna URL till din server-endpoint
      const response = await fetch("/api/bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBid),
      });

      if (response.ok) {
        setFeedbackMessage("Bid placed successfully!");
        setIsBidSuccessful(true);
      } else {
        setFeedbackMessage("Failed to place bid. Please try again.");
        setIsBidSuccessful(false);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      setFeedbackMessage("An error occurred while placing the bid. Please try again later.");
      setIsBidSuccessful(false);
    }
  }

  function setNewBidText(event) {
    setBidText(event.target.value);
  }

  return (
    <div className="card">
      {item.imageUrl && <img src={item.imageUrl} className="card-img-top" alt={item.name} />}
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">Starting price: ${item.price}</p>
        <p className="card-text"><small className="text-muted">Ends in: <Countdown date={date} renderer={renderer} /></small></p>
        <div className="d-grid gap-2">
          <form onSubmit={addNewBid}>
            <input
              className="form-control"
              type="number"
              value={bidText}
              onChange={setNewBidText}
              placeholder="Enter your bid"
            />
            <button className="btn btn-primary mt-2" type="submit">Place Bid</button>
          </form>
          <p className={`text-${isBidSuccessful ? 'success' : 'danger'}`}>{feedbackMessage}</p>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {item.features && item.features.map((feature, index) => (
          <li className="list-group-item" key={index}>{feature}</li>
        ))}
      </ul>
      <div className="card-footer">
        <small className="text-muted">Highest Bid: ${highestBidAmount}</small>
      </div>
    </div>
  );
}

export default BidItem;