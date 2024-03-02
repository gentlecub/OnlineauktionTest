import { createContext, useState, useEffect } from 'react'
import apiRequest from './apiRequest'
import { Await } from 'react-router-dom'

const GlobalContext = createContext()
  const API_CAR_URL = 'http://localhost:3000/cars' 
  const API_USER_URL = 'http://localhost:3000/Users'
  const API_AUTION_URL = 'http://localhost:3000/Auctions' 
    
  

function GlobalProvider({ children }) {
    
    const [value, setValue] = useState(1)
    const [carItem, setCarItem] = useState([])
    const [user, setUser] = useState([])
    const [auction, setAuction] = useState([])
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCartItems, setFilteredCartItems] = useState([])
    const [duration,setduration] = useState([])
  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch(API_CAR_URL); 
          const responseDuration = await fetch(API_AUTION_URL)
          if (!response.ok && !responseDuration.ok) throw Error("Did not receive expected data")
            const listCarItem = await response.json()
            const listDuration = await responseDuration.json()
          const updatedCarItem = listCarItem.map(car => {
                const match = listDuration.find(item => item.carId === car.id);
                if (match) {
                   const durationHrs = Math.abs( new Date(match.endTime));
                   // const durationHrs = difMin / (1000 * 60 * 60);
                    return { ...car, duration: durationHrs };
                }
                return car;
          });
          setCarItem(updatedCarItem)
          setFetchError(null)
        } catch(err) {
          setFetchError(err.message)
        } finally {
            setIsLoading(false)
         }

      }
        fetchItems()
    }, [])
  
  
  
  useEffect(() => {
    const fetchDurations = async () => {
        try {
            const response = await fetch(API_AUTION_URL); 
            if (!response.ok) throw Error("Did not receive expected data");
            const listDurationItem = await response.json();
            
            
            
            setCarItem(updatedCarItem);
            setFetchError(null);
        } catch(err) {
            setFetchError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (carItem.length > 0) {
        fetchDurations();
    }
}, [carItem]);

  return <GlobalContext.Provider value={{
    carItem, setCarItem, fetchError, setFetchError,
    isLoading, setIsLoading, duration, setduration
  }}>
    {children}
  </GlobalContext.Provider>
}


export { GlobalProvider, GlobalContext }
