import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



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
  
  return (
    <main>
      

            {cars.length ? (
                <ul className="container">
                  {cars.map((car) => (
                    <li className="item" key={car.id}>
                      <Link to={"/cars/" + car.id}>
                        <div>
                          <div className="item">
                            <img src="imagen1.jpg" alt="Imagen 1"/>
                          </div>
                        <div className="information">
                            <p>{ car.brand }</p>
                            <span className="name">{ car.brand }</span>
                            <span className="description">{car.color}</span>
                          </div>
                        </div>
                        </Link>
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
