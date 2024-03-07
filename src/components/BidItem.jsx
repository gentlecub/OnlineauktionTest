import { useState } from "react";
import Countdown from "react-countdown";

function BidItem({ item, userId }) {
  const date = new Date(item.endTime);
  const [bidText, setBidText] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const renderer = ({ hours, minutes }) => {
    return (
      <span className="align-middle fs-4">
        {hours}hr :{minutes} min
      </span>
    );
  };

  async function addNewBid(event) {
    event.preventDefault();

    const newBid = {
      auctionId: item.id,
      bidAmount: parseInt(bidText),
      userId: userId,
    };

    try {
      const response = await fetch("/api/bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBid),
      });

      if (response.ok) {
        setFeedbackMessage("Bid placed successfully!");
      } else {
        setFeedbackMessage("Failed to place bid. Please try again.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      setFeedbackMessage("An error occurred while placing the bid. Please try again later.");
    }
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
          {feedbackMessage && <p className={response.ok ? "text-success" : "text-danger"}>{feedbackMessage}</p>}
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