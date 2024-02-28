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
 const handleSelect = (id) => {
        const listItems = cars.map((item) => item.id === id );
        setCars(listItems);
        console.log(listItems)
    }

  return (
      <main>
            {cars.length ? (
                <ul className="container">
                  {cars.map((car) => (
                    <li className="item" key={car.id}>
                        <div onClick={() => handleSelect(car.id)}>
                          <div className="item">
                            <img src="imagen1.jpg" alt="Imagen 1"/>
                        </div>
                        <div className="information">
                            <p>{ car.brand }</p>
                            <span className="name">{ car.brand }</span>
                            <span className="description">{car.color}</span>
                          </div>
                        </div>
                    </li>
                    ))}
                </ul>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>   


    )
}
export default  CarsHome 
