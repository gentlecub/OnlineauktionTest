
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const { value, setValue, cart, setCart, filteredCartItems,
    setFilteredCartItems } = useContext(GlobalContext)
  return <main>
    {
      cart.filter(cartItem => cartItem.amount != 0).map(cartItem => <>
        <article class="my-search-item">
          <div class="product clearfix">
            <div class="content">
              <h2>{cartItem.name}</h2>
              <p>{cartItem.description}</p>
              <p>Nr of items ordered: {cartItem.amount}</p>
              <p>Total price: {cartItem.amount * cartItem.cost}</p>
            </div>
          </div>
        </article>
      </>)
    }
    <Link to="/" ><p>Home</p></Link>
  </main>
}
