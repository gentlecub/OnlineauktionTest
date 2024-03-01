
import { useEffect, useState } from "react";

function MyAuction() {

  const [cars, setCars] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [titleText, setTitleText] = useState("")
  const [filteredItems, setFilteredItems] = useState([])
  const [bidText, setBidText] = useState("")

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

  function getSelectedCar(id) {

    let listItem;

    for (let i = 0; i < cars.length; i++) {
      if (cars[i].id == id) {
        listItem = cars[i];
      }
    }

    return listItem;

  }

  function getAuctionIndexFromId(id) {

    let index = -1
    let i = 0

    for (i = 0; i < auctions.length; i++) {
      if (auctions[i].id == id) {
        index = i

      }
      else {
        index = -5
      }
    }

    return index

  }

  function addNewBid(event, filteredItems, auction) {

    event.preventDefault()

    let bFound = false
    let n = filteredItems.length
    let bid = 0
    id = 3
    let index = getAuctionIndexFromId(auction.id)

    console.log("The index is: " + index)

    bid = parseInt(event.target.value)

    if (n > 0 && bid > filteredItems[index].highestBid) {
      filteredItems[index].highestBid = bid
      bFound = true
    }

    if (bFound) {
      setFilteredItems([...filteredItems])
      // alert(`Auction object with id ${auctions[index].id} has now recieved a new highest bid!`)
    }

  }

  function setNewBidText(event, auction) {

    const newBidText = event.target.value.toLowerCase()
    setBidText(event.target.value)

  }

  function searchTitle(event) {

    const newTitleText = event.target.value.toLowerCase()
    setTitleText(event.target.value)

    const newAuctionList = auctions.filter(item => item.title.toLowerCase().includes(newTitleText))
    setFilteredItems(newAuctionList)

  }

  return (
    <main>
      <form>
        <label for="exampleFormControlInput1">Auction title of the car to search:</label>
        <input className="flex-sm-fill text-sm-center nav-link" name="titleText"
          value={titleText} onChange={searchTitle} />
        <br />
      </form>
      {auctions.length ? (
        <ul className="container">
          {filteredItems.map((auction) => (
            <li className="item" key={auction.id}>
              <div className=".container-p">
                <span className="auctiontitle">Auction Title: {auction.title}</span><br />
                <span className="starttime">Start Time: {auction.startTime}</span><br />
                <span className="endtime">End Time: {auction.endTime}</span><br />
                <span className="highestbid">Highest Bid: {auction.highestBid}</span><br />
                <span className="carbrand">Brand for the Car: {getSelectedCar(auction.carId).brand}</span><br />
                <form onSubmit={(event) => addNewBid(event, filteredItems, auction)} >
                  <input className="flex-sm-fill text-sm-center nav-link" name="bidText"
                    value={bidText} onChange={(event) => setNewBidText(event, auction.id)} />
                  <button type="submit" data-click="AddNewBid">Add New Bid</button>
                </form>
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
