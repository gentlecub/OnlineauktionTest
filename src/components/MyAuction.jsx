import { useEffect, useState } from "react";

function MyAuction() {
  const [auctions, setAuctions] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [bidText, setBidText] = useState("");
  const [auctionIdText, setAuctionIdText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [userId, setUserId] = useState(""); // Användar-ID, du behöver hämta detta från inloggningen eller användaren

  useEffect(() => {
    async function loadAuctions() {
      try {
        const responseAuctions = await fetch('/api/Auctions');
        if (!responseAuctions.ok) {
          throw new Error("Failed to fetch auctions");
        }
        const data = await responseAuctions.json();
        setAuctions(data);
        setFilteredItems(data); // Set filtered list to all auctions initially
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

  const setNewAuctionIdText = (event) => {
    setAuctionIdText(event.target.value);
  }

  async function addNewBid(event) {
    event.preventDefault();

    const id = parseInt(auctionIdText);
    const index = getAuctionIndexFromId(id, filteredItems);
    const bid = parseFloat(bidText);

    if (filteredItems.length <= 0 || id < 0 || index < 0) {
      alert(`Something went wrong or the price is too low!`);
      return;
    }

    const newBid = {
      auctionId: id,
      bidAmount: bid,
      userId: userId,
    };

    try {
      // POST request to save the bid to the database
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

      // Update the local state with the new bid
      const updatedItems = [...filteredItems];
      updatedItems[index].highestBid = bid;
      setFilteredItems(updatedItems);

      alert("Bid placed successfully!");

      setBidText("");
      setAuctionIdText("");
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
