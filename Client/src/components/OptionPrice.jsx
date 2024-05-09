function OptionPrice({ item }) {
  console.log(item);
  return item.map((car) => (
    <option key={car.id1} value={car.id1} data-test={`priceoption${car.id1}`}>
      {`${car.precio1}-${car.precio2}`}
    </option>
  ));
}
export default OptionPrice;
