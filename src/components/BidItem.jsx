import { useState, useEffect } from "react";
import Countdown from "react-countdown";

function BidItem({ item, userId }) {
  const endTime = new Date(item.endTime);
  const isValidDate = !isNaN(endTime.getTime());

  const [bidText, setBidText] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isBidSuccessful, setIsBidSuccessful] = useState(false);
  const [auctions, setAuctions] = useState([]);

  const latestBid = item.latestBid || {};
  let highestBidAmount = latestBid.bidAmount || 0;
  const startPrice = item.price; //startpriset för denna auction?

  useEffect(() => {

    async function loadAuctions() {
      try {
        const response = await fetch("/api/auctions");
        if (!response.ok) throw new Error("Failed to fetch auctions");
        const data = await response.json();
        console.log("DATA", data);
        setAuctions(data);
      } catch (error) {
        console.error("Error loading auctions:", error);
      }
    }
    loadAuctions();
  }, []);

  console.log("ACTION", auctions);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="align-middle fs-4">Auktionen har avslutats</span>;
    } else {
      return <span className="align-middle fs-4">{days}d {hours}h {minutes}m {seconds}s kvar</span>;
    }
  };

  const validateBid = (bidAmount) => {
    if (isNaN(bidAmount)) {
      setFeedbackMessage("Ange ett giltigt tal för ditt bud.");
      setIsBidSuccessful(false);
      return false;
    }

    const minimumBid = Math.max(startPrice, highestBidAmount + 1);
    if (bidAmount < minimumBid) {
      setFeedbackMessage(`Ditt bud måste vara högre än $${minimumBid}.`);
      setIsBidSuccessful(false);
      return false;
    }

    return true;
  };

  function getAuctionIndexFromId(id, filteredItems) {

    let index = -1
    let i = 0

    for (i = 0; i < filteredItems.length; i++) {
      if (filteredItems[i].id == id) {
        index = i
      }
    }

    return index

  }

  async function storeAuctionBid(data, id) {

    await fetch(`/api/auctions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  }

  async function addNewBid(event) {

    event.preventDefault();

    const bidAmount = parseInt(bidText);
    if (!validateBid(bidAmount)) return;

    let newAuction = auctions.find((auction) => auction.carId == item.id)
    let auctionIndex = getAuctionIndexFromId(newAuction.id, auctions)
    highestBidAmount = parseInt(newAuction.highestBid)
    newAuction.highestBid = bidText
    auctions[auctionIndex].highestBid = bidText
    setAuctions([...auctions])

    console.log(newAuction)
    console.log(auctionIndex)

    const newBid = {
      auctionId: newAuction.id,
      bidAmount,
      userId: "", // Anta att userId är korrekt hanterat och finns
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
        setFeedbackMessage("Budet har lagts framgångsrikt!");
        setIsBidSuccessful(true);
      } else {
        setFeedbackMessage("Det gick inte att lägga budet. Försök igen.");
        setIsBidSuccessful(false);
      }


      await storeAuctionBid(newAuction, newAuction.id)

    } catch (error) {
      console.error("Fel vid placering av bud:", error);
      setFeedbackMessage("Ett fel inträffade vid placering av budet. Försök igen senare.");
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
        <p className="card-text">Startpris: ${startPrice}</p>
        <p className="card-text">
          <small className="text-muted">
            Slutdatum: {isValidDate ? <Countdown date={endTime} renderer={renderer} /> : 'Ogiltigt eller saknas'}
          </small>
        </p>
        <div className="d-grid gap-2">
          <form onSubmit={addNewBid}>
            <input
              className="form-control"
              type="number"
              min={Math.max(startPrice, highestBidAmount) + 1}
              value={bidText}
              onChange={setNewBidText}
              placeholder="Ange ditt bud"
            />
            <button className="btn btn-primary mt-2" type="submit">Lägg Bud</button>
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
        <small className="text-muted">Högsta bud: ${highestBidAmount}</small>
      </div>
    </div>
  );
}

export default BidItem;
