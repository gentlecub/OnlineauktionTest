import { Link } from "react-router-dom";
import LoginComp from "./authentiction/LoginComp";
import RegisterComp from "./authentiction/RegisterComp";
import Filter from "./Filter";
import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "../context/AuthContext.jsx";

function MyNav() {
  const { user } = useContext(AuthContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [showFiltre, setShowFiltre] = useState(false);
  const { filteredCartItems, setFilteredCartItems } = useContext(GlobalContext);
  // console.log("FiltreCar item", filteredCartItems);

  return (
    <header>
      <nav className="nav flex-column flex-sm-row" data-test="nav">
        <Link to="/" data-test="nav-home" className="text-sm-right nav-link">
          Home
        </Link>

        <Link
          to="/contact-page"
          data-test="nav-contact-page"
          className="text-sm-right nav-link"
        >
          Contact Us
        </Link>

        <Link
          to="/show-auction-page"
          data-test="nav-show-auction-page"
          className="text-sm-right nav-link"
        >
          Show Current Auction
        </Link>

        {/* Add condition based on usertype? admin / user*/}
        {user ? (
          <Link
            to="/userpage"
            data-test="nav-userpage"
            className="text-sm-right nav-link"
          >
            Userpage
          </Link>
        ) : (
          <Link
            to="/registering-page"
            data-test="nav-registering-page"
            className="text-sm-right nav-link"
          >
            Register / Login
          </Link>
        )}
      </nav>

      {filteredCartItems ? (
        <Filter
          filteredCartItems={filteredCartItems}
          setFilteredCartItems={setFilteredCartItems}
        />
      ) : null}
    </header>
  );
}

export default MyNav;
