
import { useEffect, useState } from "react";

function MyAuction() {

  const [cars, setCars] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {

    async function load() {
      const responseCars = await fetch('/api/cars')
      const cars = await responseCars.json()
      setCars(cars)

      const responseAuctions = await fetch('/api/cars')
      const auctions = await responseAuctions.json()
      setAuctions(auctions)
    }
    load()
  }, []) // tom array som andra argument = körs endast vid komponentladdning

  const handleSelectCars = (id) => {
    const listItems = cars.map((item) => item.id === id);
    setCars(listItems);
    console.log(listItems)
  }

  return (
    <main>
      {auctions.length ? (
        <ul className="container">
          {auctions.map((auction) => (
            <li className="item" key={auction.id}>
              <div className="information">
                <span className="auctionid">Auction ID: {auction.id}</span>
                <span className="starttime">Start Time: {auction.startTime}</span>
                <span className="endtime">End Time: {auction.endTime}</span>
                <span className="highestbid">Highest Bid: {auction.highestBid}</span>
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

export default MyAuction
