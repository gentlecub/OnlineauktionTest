import { useEffect, useState } from "react";

function MyAuction() {
  const [auctions, setAuctions] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [maxBidText, setMaxBidText] = useState("");
  const [currDateText, setCurrDateText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [userId, setUserId] = useState("user123"); // Ersätt med faktisk användare logik

  useEffect(() => {
    async function loadAuctions() {
      try {
        const response = await fetch("/api/auctions");
        if (!response.ok) throw new Error("Failed to fetch auctions");
        const data = await response.json();
        console.log("DATA", data);
        setAuctions(data);
        applyFilters(data);
      } catch (error) {
        console.error("Error loading auctions:", error);
      }
    }
    loadAuctions();
  }, []);

  console.log("ACTION", auctions);

  const applyFilters = (auctions) => {
    let result = auctions.filter((auction) =>
      auction.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    if (maxBidText) {
      result = result.filter(
        (auction) => parseFloat(auction.highestBid) <= parseFloat(maxBidText)
      );
    }
    if (currDateText) {
      const targetDate = new Date(currDateText).toISOString().split("T")[0];
      result = result.filter(
        (auction) =>
          new Date(auction.endTime).toISOString().split("T")[0] === targetDate
      );
    }
    setFilteredItems(result);
  };

  useEffect(() => {
    applyFilters(auctions);
  }, [searchTitle, maxBidText, currDateText, auctions]);

  const handleBidInputChange = (e) => {
    setBidAmount(e.target.value);
  };

  async function placeBid(auctionId, bidAmount) {
    try {
      const highestBid = filteredItems.find(
        (auction) => auction.id === auctionId
      )?.highestBid;

      if (bidAmount <= highestBid) {
        throw new Error("Bid amount must be higher than the highest bid");
      }

      const response = await fetch(`/api/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auctionId,
          bidAmount,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place bid");
      }

      alert("Bid placed successfully!");
      loadAuctions();
    } catch (error) {
      console.error("Error placing bid:", error.message);
      alert(error.message);
    }
  }

  return (
    <main>
      <div>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search by title"
        />
        <input
          type="number"
          value={maxBidText}
          onChange={(e) => setMaxBidText(e.target.value)}
          placeholder="Max bid"
        />
        <input
          type="date"
          value={currDateText}
          onChange={(e) => setCurrDateText(e.target.value)}
        />
      </div>
      <div>
        <select
          value={selectedAuction}
          onChange={(e) => setSelectedAuction(parseInt(e.target.value))}
        >
          <option value="">-- Select Auction --</option>
          {filteredItems.map((auction) => (
            <option key={auction.id} value={auction.id}>
              {auction.title}
            </option>
          ))}
        </select>
        {selectedAuction && (
          <button onClick={() => setSelectedAuction(null)}>
            Back to Auctions
          </button>
        )}
      </div>
      <div>
        {selectedAuction ? (
          <div className="auction-details">
            <h3>
              {
                filteredItems.find(
                  (auction) => auction.id === selectedAuction.toString()
                ).title
              }
            </h3>
            <p>Auction ID: {selectedAuction}</p>
            <p>
              Start Time:{" "}
              {
                filteredItems.find(
                  (auction) => auction.id === selectedAuction.toString()
                ).startTime
              }
            </p>
            <p>
              End Time:{" "}
              {
                filteredItems.find(
                  (auction) => auction.id === selectedAuction.toString()
                ).endTime
              }
            </p>
            <p>
              Highest Bid: $
              {
                filteredItems.find(
                  (auction) => auction.id === selectedAuction.toString()
                ).highestBid
              }
            </p>
            <div>
              <input
                type="number"
                value={bidAmount}
                onChange={handleBidInputChange}
                placeholder="Enter bid amount"
              />
              <button
                onClick={() => placeBid(selectedAuction, parseFloat(bidAmount))}
              >
                Place Bid
              </button>
            </div>
          </div>
        ) : (
          <ul className="container">
            {filteredItems.map((auction) => (
              <li key={auction.id} className="item">
                <div className="auction-details">
                  <h3>{auction.title}</h3>
                  <p>Auction ID: {auction.id}</p>
                  <p>Start Time: {auction.startTime}</p>
                  <p>End Time: {auction.endTime}</p>
                  <p>Highest Bid: ${auction.highestBid}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default MyAuction;
