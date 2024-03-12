import { createContext, useState, useEffect, useContext } from "react";
import apiRequest from "./apiRequest";
import { Await } from "react-router-dom";

const GlobalContext = createContext();
const API_CAR_URL = "http://localhost:3000/cars";
const API_AUTION_URL = "http://localhost:3000/Auctions";
const API_BID_URL = "http://localhost:3000/bid";

function GlobalProvider({ children }) {
  const [carItem, setCarItem] = useState([]);
  const [auction, setAuction] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [duration, setduration] = useState([]);
  const [originalCarItem, setOriginalCarItem] = useState([]);
  const [globalMsg, setGlobalMsg] = useState("Holaa");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_CAR_URL);
        const responseDuration = await fetch(API_AUTION_URL);

        if (!response.ok && !responseDuration.ok)
          throw Error("Did not receive expected data");
        const listCarItem = await response.json();
        console.log(listCarItem);
        const listDuration = await responseDuration.json();
        console.log(listDuration);
        const updatedCarItem = listCarItem.map((car) => {
          const match = listDuration.find((item) => item.carId === car.id);
          if (match) {
            const durationHrs = Math.abs(new Date(match.endTime));
            return { ...car, duration: durationHrs };
          }
          return car;
        });
        setCarItem(updatedCarItem);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);
   console.log("GLOBAL",carItem)
  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const response = await fetch(API_AUTION_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listDurationItem = await response.json();
        setAuction(listDurationItem);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (carItem.length > 0) {
      fetchDurations();
    }
  }, [carItem]);

  const placeBid = async (auctionId, bidAmount) => {
    try {
      const response = await fetch(`${API_BID_URL}/${auctionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bidAmount }),
      });
      if (!response.ok) {
        throw new Error("Failed to send bid to server.");
      }
      console.log("Bid successfully sent to server.");
    } catch (error) {
      console.error("Error sending bid to server:", error);
      throw error;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        carItem,
        auction,
        fetchError,
        isLoading,
        placeBid,
        originalCarItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider, GlobalContext };
