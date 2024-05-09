import CarsHome from "../components/CarsHome.jsx";
import AddItem from "../components/AddItem.jsx";
import { Alert } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/authentiction/AuthContext.jsx";
import LoadProgress from "../components/authentiction/LoadProgress.jsx";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [item, setitem] = useState(null);
  return (
    <>
      {item && <LoadProgress item={item} setitem={setitem} />}

      {currentUser && <AddItem setitem={setitem} />}
      <CarsHome />
    </>
  );
}

export default HomePage;
