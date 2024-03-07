import { useEffect, useState } from "react";

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

  async function addNewBid(event) {
    event.preventDefault();

    const newBid = {
      auctionId: parseInt(auctionIdText),
      bidAmount: parseFloat(bidText)
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
        alert("Bid placed successfully!");

        // Hämta den uppdaterade auktionen från servern
        const updatedAuctionResponse = await fetch(`/api/auctions/${newBid.auctionId}`);
        const updatedAuctionData = await updatedAuctionResponse.json();

        // Uppdatera den lokala state-variabeln auctions med den uppdaterade auktionen
        setAuctions(prevAuctions => {
          const updatedAuctions = prevAuctions.map(auction => {
            if (auction.id === updatedAuctionData.id) {
              return updatedAuctionData;
            }
            return auction;
          });
          return updatedAuctions;
        });

        // Återställ formuläret efter att budet har lagts till
        setBidText("");
        setAuctionIdText("");
      } else {
        alert("Failed to place bid. Please try again.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("An error occurred while placing the bid. Please try again later.");
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
