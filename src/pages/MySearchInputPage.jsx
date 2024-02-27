
import { useState, useEffect, useContext } from 'react'
import { GlobalContext, GlobalProvider } from "../components/GlobalContext.jsx";


function MySearchInputPage() {

  const { value, setValue, cart, setCart, filteredCartItems,
    setFilteredCartItems } = useContext(GlobalContext)
  const [searchText, setSearchText] = useState("Type to Search")
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])


  function addWareToCart(item) {

    let bFound = false
    let n = cart.length
    for (let i = 0; i < n; i++) {

      if (item.id == cart[i].id) {
        cart[i].amount += 1
        bFound = true
      }

    }

    if (bFound) {
      setCart([...cart])
    }
    console.log("The cart is: ")
    console.log(cart)
    // setCart([...cart, cartItem])
    alert(`Ware with id ${item.id} added to cart!`)

  }

  function search(event) {

    const newSearchText = event.target.value.toLowerCase()
    setSearchText(event.target.value)

    const newList = items.filter(item => item.name.toLowerCase().includes(newSearchText))
    setFilteredItems(newList)

    const newCartList = cart.filter(cart => cart.amount != 0)
    setFilteredCartItems(newCartList)

  }


  // körs vid varje (om)rendering, körs när man lämnar komponenten
  useEffect(() => {
    async function load() {
      const response = await fetch('lamps.json')
      const items = await response.json()
      console.log(items)
      setItems(items)
      setFilteredItems(items)
      setCart(items.map(item => { return { ...item, amount: 0 } }))
      setFilteredCartItems(cart)
    }
    load()
  }, []) // tom array som andra argument = körs endast vid komponentladdning





  return <>
    <form>
      <input class="flex-sm-fill text-sm-center nav-link" name="searchText"
        value={searchText} onChange={search} />
      <br />
    </form>
    {

      filteredItems.map(item => <>
        <article class="my-search-item">
          <div class="product clearfix">
            <img src={item.image} />
            <div class="content">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <button onClick={() => addWareToCart(item)} data-click="buy">Köp för {item.cost} kr</button>
            </div>
          </div>
        </article>
      </>

      )

    }

  </>

}

export default MySearchInputPage
