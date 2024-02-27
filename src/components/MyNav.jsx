
import { Link } from "react-router-dom"

function MyNav() {

  return (
    <header>
      <nav class="nav flex-column flex-sm-row">
        <Link to="/" class="flex-sm-fill flex-grow-1 text-sm-left nav-link active"><h1>Online Auction</h1></Link>
        <Link to="/my-search-input-page" class="flex-sm-fill flex-grow-1 text-sm-left nav-link active">Search wares</Link>
        <Link to="/cart-page" class="flex-sm-fill flex-grow-1 text-sm-left nav-link active">To Cart</Link>
        <Link to="/contact-page" class="text-sm-right nav-link" >Kontakta oss</Link>
      </nav>
    </header>
  )

}

export default MyNav
