import { Link } from "react-router-dom";
import LoginComp from "./authentiction/LoginComp";
import RegisterComp from "./authentiction/RegisterComp";
import { GlobalProvider } from "./GlobalContext";
import Filter from "./Filter";
import { useContext } from "react";
import { AuthContext } from "./authentiction/AuthContext";

function MyNav() {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <header>
      <nav className="nav flex-column flex-sm-row">
        <Link
          to="/"
          className="flex-sm-fill flex-grow-1 text-sm-left nav-link active"
        >
          <h1>Online Auction</h1>
        </Link>
        <Link
          to="/my-search-input-page"
          className="flex-sm-fill flex-grow-1 text-sm-left nav-link active"
        >
          Search wares
        </Link>
        <Link
          to="/cart-page"
          className="flex-sm-fill flex-grow-1 text-sm-left nav-link active"
        >
          To Cart
        </Link>
        <Link to="/contact-page" className="text-sm-right nav-link">
          Kontakta oss
        </Link>
        <Link to="/show-auction-page" className="text-sm-right nav-link">
          Show Current Auction
        </Link>
        <div className="d-flex">
          <div className="col">
            {currentUser ? (
              <>
                <div className="btn btn-outline-secondary mx-2 disabled">
                  {currentUser.email}
                </div>
                <div
                  onClick={() => logout()}
                  className="btn btn-outline-secondary mx-2"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <LoginComp />
                <RegisterComp />
              </>
            )}
          </div>
        </div>
      </nav>
      <Filter />
    </header>
  );
}

export default MyNav;
