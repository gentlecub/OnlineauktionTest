
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MyNav from "./MyNav.jsx"
import HomePage from "../pages/HomePage.jsx"
import MySearchInputPage from "../pages/MySearchInputPage.jsx"
import ContactPage from "../pages/ContactPage.jsx"
import { GlobalProvider } from '../context/GlobalContext.jsx'
import Cart from '../pages/Cart.jsx'
import CarDetail from "../pages/CarDetails.jsx"
import ShowAuctionPage from "../pages/ShowAuctionPage.jsx"
import UserPage from "../pages/UserPage.jsx"
import RegisterUser from '../pages/RegisterUser.jsx'
import ProtectedRoute from "./ProtectedRoute.jsx"

function MyRouter() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="page corners padding transp">
          <MyNav />

          <main>
            <div>
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/my-search-input-page" element={<MySearchInputPage />} />
                <Route path="/contact-page" element={<ContactPage />} />
                <Route path="/cars/:id" element={< CarDetail />} />
                <Route path="/cart-page" element={<Cart />} />
    
                <Route path="/cart-page" element={ <Cart /> } />
                <Route path="/registering-page" element={ <RegisterUser /> } />
                <Route path="/show-auction-page" element={<ShowAuctionPage/>} />
                <Route element = {< ProtectedRoute />}>
                  <Route path="/userpage" element={<UserPage />} /> </Route>
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  )

}

export default MyRouter
