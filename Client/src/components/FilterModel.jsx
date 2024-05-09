import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { GlobalContext } from "../context/GlobalContext";
import OptionModel from "./OptionModel";
function FilterModel({ carItem, setCarItem, originalCarItem }) {
  //const { carItem, setCarItem, originalCarItem } = useContext(GlobalContext);
  const [fetchError, setFetchError] = useState(null);
  const [carmodel, SetCarModel] = useState([]);
  const [listcar, SetListCard] = useState([]);
  const [actioncar, SetActionCar] = useState([]);
  console.log(carItem);
  console.log(carmodel);
  useEffect(() => {
    const fetchCar = () => {
      try {
        const model = carItem.reduce((acc, car) => {
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
  }, [carItem]);

  function handleModel(e) {
    e.preventDefault();
    const selectBrach = e.target.value;
    let models;
    if (selectBrach === "Model") {
      models = originalCarItem;
    } else {
      models = carItem.filter((model) => model.brand === selectBrach);
    }
    setCarItem(models);
  }

  return (
    <>
      <Form.Select size="sm" onChange={handleModel} data-test="selectmodel">
        <option>Model</option>
        <OptionModel item={carmodel} />
      </Form.Select>
    </>
  );
}

export default FilterModel;
