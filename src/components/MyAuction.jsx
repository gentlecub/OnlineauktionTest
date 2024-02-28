
import { useEffect, useState } from "react";

function MyAuction() {

  const [cars, setCars] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {

    async function load() {
      const responseCars = await fetch('/api/cars')
      const cars = await responseCars.json()
      setCars(cars)

      const responseAuctions = await fetch('/api/auctions')
      const auctions = await responseAuctions.json()
      console.log(auctions)
      setAuctions(auctions)
    }
    load()
  }, []) // tom array som andra argument = körs endast vid komponentladdning

  const handleSelectedCar = (id) => {
    const listItem = cars.filter((car) => (car.id == id))
    return listItem;
  }

  function addNewBid(event, auction) {

  }

  return (
    <main>
      {auctions.length ? (
        <ul className="container">
          {auctions.map((auction) => (
            <li className="item" key={auction.id}>
              <div className=".container-p">
                <span className="auctionid">Auction ID: {auction.id}</span><br />
                <span className="starttime">Start Time: {auction.startTime}</span><br />
                <span className="endtime">End Time: {auction.endTime}</span><br />
                <span className="highestbid">Highest Bid: {auction.highestBid}</span><br />
                <button onClick={(event) => addNewBid(event, auction)} data-click="AddNewBid">Add New Bid</button>
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
