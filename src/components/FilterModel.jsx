import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import CarsHome from "./CarsHome";
import AuctionCard from "./AuctionCard";
import { GlobalContext } from "./GlobalContext";
import CarItem from "./CarItem";
import OptionModel from "./OptionModel";
function FilterModel() {
  const { setCarItem, carItem, originalCarItem } = useContext(GlobalContext);
  const [fetchError, setFetchError] = useState(null);
  const [carmodel, SetCarModel] = useState([]);
  const [listcar, SetListCard] = useState([]);
  const [actioncar, SetActionCar] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        if (!response.ok) throw Error("Did not receive expected data");
        const listCarItem = await response.json();
        SetListCard(listCarItem);
        console.log(listCarItem);
        const model = listCarItem.reduce((acc, car) => {
          if (!acc.includes(car.brand)) {
            acc.push(car.brand);
          }
          return acc;
        }, []);
        SetCarModel(model);
        console.log(model);
      } catch (err) {
        setFetchError(err.message);
      }
    };

    fetchCar();
  }, []);

  const handleModel = (e) => {
    e.preventDefault();
    const selectBrach = e.target.value;
    const originalCarItem = carItem;
    console.log(originalCarItem);
    const models = carItem.filter((model) => model.brand === selectBrach);
    setCarItem(models);
  };

  return (
    <>
      <Form.Select size="sm" onChange={handleModel}>
        <option>Model</option>
        <OptionModel item={carmodel} />
      </Form.Select>
    </>
  );
}

export default FilterModel;
