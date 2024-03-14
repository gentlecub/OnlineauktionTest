import { Link } from "react-router-dom";
import LoginComp from "./authentiction/LoginComp";
import RegisterComp from "./authentiction/RegisterComp";
import Filter from "./Filter";
import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "../context/AuthContext.jsx"

function MyNav() {

  const { user } = useContext(AuthContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [showFiltre, setShowFiltre] = useState(false);
  const { filteredCartItems, setFilteredCartItems } = useContext(GlobalContext);
  console.log("FiltreCar item", filteredCartItems);

  return (
    <header>
      <nav className="nav flex-column flex-sm-row">
        <Link to="/" className="text-sm-right nav-link" >Home</Link>


        <Link to="/contact-page" className="text-sm-right nav-link" >Contact Us</Link>

        <Link to="/show-auction-page" className="text-sm-right nav-link">
          Show Current Auction
        </Link>


        {user ? (<Link to="/userpage" className="text-sm-right nav-link" >Userpage</Link>) : (<Link to="/registering-page" className="text-sm-right nav-link" >Register / Login</Link>)}

      </nav>

      {filteredCartItems ? <Filter /> : null}
    </header>
  );
}

export default MyNav;
