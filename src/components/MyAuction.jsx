import { useEffect, useState } from "react";

function MyAuction() {
  const [auctions, setAuctions] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [bidText, setBidText] = useState("");
  const [auctionId, setAuctionId] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function loadAuctions() {
      try {
        const responseAuctions = await fetch('/api/Auctions');
        if (!responseAuctions.ok) {
          throw new Error("Failed to fetch auctions");
        }
        const data = await responseAuctions.json();
        setAuctions(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error loading auctions:", error);
      }
    }
    loadAuctions();
  }, []);

  useEffect(() => {
    setFilteredItems(auctions.filter(item => item.title.toLowerCase().includes(searchTitle.toLowerCase())));
  }, [searchTitle, auctions]);

  const handleSearchTitle = (event) => {
    setSearchTitle(event.target.value);
  }

  const setNewBidText = (event) => {
    setBidText(event.target.value);
  }

  const setNewAuctionId = (event) => {
    setAuctionId(event.target.value);
  }

  async function addNewBid(event) {
    event.preventDefault();

    const id = parseInt(auctionId);
    const index = getAuctionIndexFromId(id, filteredItems);
    const bid = parseFloat(bidText);

    if (filteredItems.length <= 0 || id < 0 || index < 0) {
      alert(`Something went wrong or the price is too low!`);
      return;
    }

    const currentHighestBid = filteredItems[index].highestBid || 0;

    if (bid <= currentHighestBid) {
      alert(`Your bid must be higher than the current highest bid!`);
      return;
    }

    const newBid = {
      auctionId: id,
      bidAmount: bid,
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

      if (!response.ok) {
        throw new Error("Failed to place bid. Please try again.");
      }

      const updatedItems = [...filteredItems];
      updatedItems[index].highestBid = bid;
      setFilteredItems(updatedItems);

      alert("Bid placed successfully!");

      setBidText("");
      setAuctionId("");
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("An error occurred while placing the bid. Please try again later.");
    }
  }

  function getAuctionIndexFromId(id, items) {
    return items.findIndex(item => item.id === id);
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
        <label htmlFor="auctionIdText">Select Auction to Bid On:</label>
        <select id="auctionIdText" value={auctionId} onChange={setNewAuctionId}>
          <option value="">-- Select Auction --</option>
          {filteredItems.map((auction) => (
            <option key={auction.id} value={auction.id}>{auction.id} - {auction.title}</option>
          ))}
        </select>
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
