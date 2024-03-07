import { useEffect, useState } from "react";
import BidItem from "./BidItem";

function MyAuction() {
  const [auctions, setAuctions] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [bidText, setBidText] = useState("");
  const [auctionIdText, setAuctionIdText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function loadAuctions() {
      try {
        const responseAuctions = await fetch('/api/Auctions');
        if (!responseAuctions.ok) {
          throw new Error("Failed to fetch auctions");
        }
        const data = await responseAuctions.json();
        setAuctions(data);
        setFilteredItems(data); // Sätt filterad lista till alla auktioner vid första laddningen
      } catch (error) {
        console.error("Error loading auctions:", error);
      }
    }

    loadAuctions();
  }, []);

  const handleSearchTitle = (event) => {
    setSearchTitle(event.target.value);
    const newAuctionList = auctions.filter(item => item.title.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredItems(newAuctionList);
  }

  const setNewBidText = (event) => {
    setBidText(event.target.value);
  }

  const setNewAuctionIdText = (event) => {
    setAuctionIdText(event.target.value);
  }

  const addNewBid = async (event) => {
    event.preventDefault();
    const id = parseInt(auctionIdText);
    const bid = parseFloat(bidText);

    if (!id || !bid) {
      alert("Auction ID or Bid Price is invalid.");
      return;
    }

    const index = auctions.findIndex(auction => auction.id === id);
    if (index === -1) {
      alert("Auction ID not found.");
      return;
    }

    const updatedAuctions = [...auctions];
    updatedAuctions[index].highestBid = bid;

    try {
      await fetch(`/api/auctions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAuctions[index]),
      });
      setAuctions(updatedAuctions);
      setFilteredItems(updatedAuctions);
      alert(`Auction object with ID ${id} has now received a new highest bid!`);
    } catch (error) {
      console.error("Error updating bid:", error);
      alert("Failed to update bid.");
    }
  }

  return (
    <main>
      <div>
        <input
          type="text"
          value={searchTitle}
          onChange={handleSearchTitle}
          placeholder="Search by title"
        />
      </div>
      <form onSubmit={addNewBid}>
        <label htmlFor="auctionIdText">Auction ID to bid on:</label>
        <input
          id="auctionIdText"
          type="number"
          value={auctionIdText}
          onChange={setNewAuctionIdText}
        />
        <label htmlFor="bidText">Set new bid price on car:</label>
        <input
          id="bidText"
          type="number"
          value={bidText}
          onChange={setNewBidText}
        />
        <button type="submit">Add New Bid</button>
      </form>
      {filteredItems.length > 0 ? (
        <ul className="container">
          {filteredItems.map((auction) => (
            <li className="item" key={auction.id}>
              <div className=".container-p">
                <span className="auctionid">Auction Id: {auction.id}</span><br />
                <span className="auctiontitle">Auction Title: {auction.title}</span><br />
                <span className="starttime">Start Time: {auction.startTime}</span><br />
                <span className="endtime">End Time: {auction.endTime}</span><br />
                <span className="highestbid">Highest Bid: {typeof auction.highestBid === 'number' ? `$${auction.highestBid.toFixed(2)}` : auction.highestBid}</span><br />
                {/* För att visa övrig information om auktionen */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
      )}
    </main>
  )
}

export default MyAuction;
