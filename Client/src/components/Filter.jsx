import FilterModel from "./FilterModel";
import FiltrePrice from "./FiltrePrice";
import SearchItem from "./SearchItem";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Filter() {
  const [search, setSearch] = useState("");
  const { carItem, setCarItem, originalCarItem, setFetchError } =
    useContext(GlobalContext);
  console.log("dime que ", carItem);
  useEffect(() => {
    const filterCars = () => {
      if (search === "") {
        setCarItem(originalCarItem); // Si search está vacío, establece carItem en su estado original
      } else {
        console.log("search", search);
        const filteredCars = originalCarItem.filter((car) =>
          car.brand.toLowerCase().includes(search.toLowerCase())
        );
        console.log("filteredCars", filteredCars);
        if (filteredCars.length === 0) {
          setFetchError("No cars found matching the search criteria");
          setCarItem(filteredCars);
        } else {
          setCarItem(filteredCars);
          setFetchError(null); // Reinicia el error si hay coches encontrados
        }
      }
    };
    filterCars();
  }, [search]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {/* Aquí colocas el search box */}
            <SearchItem search={search} setSearch={setSearch} />
          </div>
          <div className="col-md-3">
            {/* Aquí colocas el primer Form.Select */}
            <FilterModel
              carItem={carItem}
              setCarItem={setCarItem}
              originalCarItem={originalCarItem}
            />
          </div>
          <div className="col-md-3">
            {/* Aquí colocas el segundo Form.Select */}
            <FiltrePrice />
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
