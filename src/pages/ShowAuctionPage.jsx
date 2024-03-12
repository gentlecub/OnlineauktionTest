import MyAuction from "../components/MyAuction.jsx";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext.jsx";
function ShowAuctionPage() {
  const { filteredCartItems, setFilteredCartItems } = useContext(GlobalContext);

  useEffect(() => {
    setFilteredCartItems(false);
  });

  return (
    <>
      <MyAuction />
    </>
  );
}

export default ShowAuctionPage;
