
import { Link } from "react-router-dom"

function MyNav() {

  return (
    <header>
      <nav className="nav flex-column flex-sm-row">
        <Link to="/" className="text-sm-right nav-link" >Home</Link>
        <Link to="/userpage" className="text-sm-right nav-link">Userpage</Link>
        <Link to="/registering-page" className="text-sm-right nav-link" >Register / Login</Link>
        <Link to="/contact-page" className="text-sm-right nav-link" >Contact Us</Link>


      </nav>
    </header>
  )

}

export default MyNav
