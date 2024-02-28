import { useEffect, useState } from "react";

function CarsHome() {

  const [cars, setCars] = useState([
  ]);

  useEffect(() => {
    async function load() {
      const response = await fetch('/api/cars')
      const cars = await response.json()
      setCars(cars)
    }
    load()
  }, []) // tom array som andra argument = körs endast vid komponentladdning
  console.log(cars)
  return <>
    <p>Cars in the auction</p>
    <ol>
      {cars.map((car) => <li>
        <p>{car.brand}</p>
        <p>{car.model}: {car.year}</p>
      </li>
      )}
    </ol>
  </>
}

export default CarsHome
