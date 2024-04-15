import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import { GlobalContext } from "../context/GlobalContext";
import OptionModel from "./OptionModel";
function FilterModel() {
  const { carItem, setCarItem, originalCarItem } = useContext(GlobalContext);
  const [fetchError, setFetchError] = useState(null);
  const [carmodel, SetCarModel] = useState([]);
  const [listcar, SetListCard] = useState([]);
  const [actioncar, SetActionCar] = useState([]);
  //console.log("CAR ITEM SETTER: ", setCarItem);
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) throw Error("Did not receive expected data");
        const listCarItem = await response.json();
        SetListCard(listCarItem);
        // console.log(listCarItem);
        const model = listCarItem.reduce((acc, car) => {
          if (!acc.includes(car.brand)) {
            acc.push(car.brand);
          }
          return acc;
        }, []);
        SetCarModel(model);
        // console.log(model);
      } catch (err) {
        setFetchError(err.message);
      }
    };

    fetchCar();
  }, []);

  function handleModel(e) {
    e.preventDefault();
    const selectBrach = e.target.value;
    // console.debug("SELECTED: ", selectBrach === "Model");
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
      <Form.Select size="sm" onChange={handleModel}>
        <option>Model</option>
        <OptionModel item={carmodel} />
      </Form.Select>
    </>
  );
}

export default FilterModel;
