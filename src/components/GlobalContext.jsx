
import { createContext, useState } from 'react'

const GlobalContext = createContext()

function GlobalProvider({ children }) {
  const [value, setValue] = useState(1)
  const [cart, setCart] = useState([])
  const [filteredCartItems, setFilteredCartItems] = useState([])

  return <GlobalContext.Provider value={{
    value, setValue, cart, setCart,
    filteredCartItems, setFilteredCartItems
  }}>
    {children}
  </GlobalContext.Provider>
}


export { GlobalProvider, GlobalContext }
