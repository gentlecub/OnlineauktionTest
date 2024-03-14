import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Form from "react-bootstrap/Form";
import OptionPrice from "./OptionPrice";
function FiltrePrice() {
  const { carItem, setCarItem, originalCarItem } = useContext(GlobalContext);
  const [carprice, SetCarPrice] = useState([]);
  const [carobject, SetCarObject] = useState([]);
  useEffect(() => {
    const FiltrePrice = async () => {
      if (carItem && carItem.length > 0) {
        setCarItem(
          carItem.sort(function (a, b) {
            return a.price - b.price;
          })
        );
        const pricesTwoInTwo = [];
        for (let i = 0; i < carItem.length; i += 2) {
          if (i + 1 < carItem.length) {
            pricesTwoInTwo.push({
              id1: carItem[i].id,
              precio1: carItem[i].price,
              id2: carItem[i + 1].id,
              precio2: carItem[i + 1].price,
            });

            if (carItem[i].price === carItem[i + 1].price) {
              if (i + 2 < carItem.length) {
                pricesTwoInTwo.push({
                  id1: carItem[i + 1].id,
                  precio1: carItem[i + 1].price,
                  id2: carItem[i + 2].id,
                  precio2: carItem[i + 2].price,
                });
                i++;
              }
            }
          } else {
            pricesTwoInTwo.push({
              id1: carItem[i].id,
              precio1: carItem[i].price,
              id2: null,
              precio2: null,
            });
          }
        }
        console.log(pricesTwoInTwo);
        SetCarPrice(pricesTwoInTwo);
      }
    };
    FiltrePrice();
  }, [carItem]);
  console.log(carItem);
  console.log(carprice);
  function handlePrice(e) {
    e.preventDefault();
    const selectBrach = e.target.value;
    console.log(selectBrach);
    console.debug("SELECTED: ", selectBrach === "Price");
    let models;
    if (selectBrach === "Price") {
      models = originalCarItem;
      setCarItem(models);
    } else {
      const objetosConId1 = carprice.filter(
        (objeto) => objeto.id1 === selectBrach
      );
      console.log(objetosConId1);
      SetCarObject(objetosConId1);
      const precio1 = objetosConId1[0].precio1;
      const precio2 = objetosConId1[0].precio2;
      const carrosEnRango = originalCarItem.filter(
        (carro) => carro.price >= precio1 && carro.price <= precio2
      );

      setCarItem(carrosEnRango);
    }
  }

  return (
    <Form.Select size="sm" onClick={handlePrice}>
      <option>Price</option>
      <OptionPrice item={carprice} />
    </Form.Select>
  );
}
export default FiltrePrice;
