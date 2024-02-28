
import { Link } from "react-router-dom"

function MyNav() {

  return (
    <header>
      <nav className="nav flex-column flex-sm-row">
        <Link to="/" className="flex-sm-fill flex-grow-1 text-sm-left nav-link active"><h1>Online Auction</h1></Link>
        <Link to="/my-search-input-page" className="flex-sm-fill flex-grow-1 text-sm-left nav-link active">Search wares</Link>
        <Link to="/cart-page" className="flex-sm-fill flex-grow-1 text-sm-left nav-link active">To Cart</Link>
        <Link to="/contact-page" className="text-sm-right nav-link" >Kontakta oss</Link>
        <Link to="/show-auction-page" className="text-sm-right nav-link" >Show Current Auction</Link>
      </nav>
    </header>
  )

}

export default MyNav
