import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import {AuthContext} from '../context/AuthContext.jsx'
import { GlobalContext } from "../context/GlobalContext.jsx";

function BidItem({ item }) {
  
  const {user} = useContext(AuthContext)
  const {auction} = useContext(GlobalContext)
  const {id} = useParams()

  const [bidText, setBidText] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isBidSuccessful, setIsBidSuccessful] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [startPrice, setStartPrice] = useState(item.price);
  const [endTime, setEndTime] = useState(null);
  const isValidDate = endTime !== null

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

  useEffect(() => {
    const auction = auctions.find((auction) => auction.carId === item.id);
    if (auction) {
      const auctionEndTime = new Date(auction.endTime);
      setEndTime(auctionEndTime);
    }
  }, [auctions, item.id]);

  const highestBid = auctions.find((auction) => auction.carId === item.id)?.highestBid || 0;

  const renderer = ({ days, hours, minutes, completed }) => {
    if (completed) {
      return <span className="align-middle fs-4">Auktionen har avslutats</span>;
    } else {
      return <span className="align-middle fs-4">{days} d {hours} h {minutes} m kvar</span>;
    }
  };

  const validateBid = (bidAmount) => {
    if (isNaN(bidAmount)) {
      setFeedbackMessage("Ange ett giltigt tal för ditt bud.");
      setIsBidSuccessful(false);
      return false;
    }

    const minimumBid = Math.max(startPrice, parseInt(highestBid) + 1);
    if (bidAmount < minimumBid) {
      setFeedbackMessage(`Ditt bud måste vara högre än $${minimumBid}.`);
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
      bidAmount,
      userId: user.id, // Anta att userId är korrekt hanterat och finns
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

        const updatedAuctions = auctions.map((auction) => {
          if (auction.carId === item.id) {
            return { ...auction, highestBid: bidText };
          }
          return auction;
        });
        setAuctions(updatedAuctions);

        await fetch(`/api/auctions/${item.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ highestBid: bidText }),
        });

      } else {
        setFeedbackMessage("Det gick inte att lägga budet. Försök igen.");
        setIsBidSuccessful(false);
      }
    } catch (error) {
      console.error("Fel vid placering av bud:", error);
      setFeedbackMessage("Ett fel inträffade vid placering av budet. Försök igen senare.");
      setIsBidSuccessful(false);
    }
  }

  function setNewBidText(event) {
    setBidText(event.target.value);
  }



  const auctionData = auction.find(auction => auction.carId === id)
  console.log('auctionData:', auctionData)

  const auctionUserId = auctionData ? auctionData.userId : null;


  return (
    <div className="card">
      {item.imageUrl && <img src={item.imageUrl} className="card-img-top" alt={item.name} />}
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">Startpris: ${startPrice}</p>
        <small className="card-text">Högsta bud: ${highestBid}</small>
       
        <p className="card-text">
        <br></br>

          <small className="text-muted">
            {isValidDate ? <Countdown date={endTime} renderer={renderer} /> : <span>Auktionen har avslutats</span>}
          </small>
        </p>
        <div className="d-grid gap-2">

          {user && user.id !== auctionUserId ? (
          <form onSubmit={addNewBid}>
            <input
              className="form-control"
              type="number"
              min={Math.max(startPrice, parseInt(highestBid) + 1)}
              value={bidText}
              onChange={setNewBidText}
              placeholder="Ange ditt bud"
            />
            <button className="btn btn-primary mt-2" type="submit">Lägg Bud</button>
          </form>
          ) : (
          "" )}
          
          <p className={`text-${isBidSuccessful ? 'success' : 'danger'}`}>{feedbackMessage}</p>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {item.features && item.features.map((feature, index) => (
          <li className="list-group-item" key={index}>{feature}</li>
        ))}
      </ul>
      <div className="card-footer">
        {/* Högsta bud used to be here 
           <small className="text-muted">Högsta bud: ${highestBid}</small> 
           
           ADD username/ name of auction creator here ?*/}
     
      </div>
    
    
    </div>
  );
}

export default BidItem;
